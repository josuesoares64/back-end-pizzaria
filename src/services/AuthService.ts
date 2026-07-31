import { compare, hash } from "bcryptjs";
import db from "../database/models";
import { sign } from "jsonwebtoken";
import sequelize from "../config/database";
import { LoginDTO, OwnerDTO, RegisterDTO, RegisterFuncionarioDTO } from "../types/auth.dto";
import { Op } from "sequelize";

class AuthService {
    async login(dto: LoginDTO) {
        const user = await db.User.findOne({
            attributes: ["id", "email", "senha_hash", "role"],
            where: { email: dto.email },
        });

        if (!user) throw new Error("Usuário inválido");

        const senhaDigitada = dto.senha.trim();
        const senhasIguais = await compare(senhaDigitada, user.senha_hash);

        if (!senhasIguais) throw new Error("Senha inválida");

        const accessToken = sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        return { accessToken };
    }

    async register(dto: RegisterDTO) {
        const userExists = await db.User.findOne({ where: { email: dto.email } });
        if (userExists) throw new Error("Usuário já existente");

        const senha_hash = await hash(dto.senha.trim(), 10);

        const user = await db.User.create({
            nome: dto.nome,
            email: dto.email,
            senha_hash,
            role: dto.role,
            telefone: dto.telefone,
        });

        return { message: "Usuário criado com sucesso", userId: user.nome };
    }

    async registerOwner(dto: OwnerDTO) {
        const userExistente = await db.User.findOne({ where: { email: dto.email } })
        if (userExistente) throw new Error("Usuário já existente");

        const transaction = await sequelize.transaction();

        const slugExistente = await db.Pizzaria.findOne({ where: { slug: dto.slug } })
        if (slugExistente) throw new Error("Slug já existente")

        try {
            const senha_hash = await hash(dto.senha.trim(), 10);

            const user = await db.User.create({
                nome: dto.nome,
                email: dto.email,
                senha_hash,
                role: dto.role,
                telefone: dto.telefone
            },
                { transaction: transaction }
            );

            const pizzaria = await db.Pizzaria.create({
                nome: dto.nomePizzaria,
                slug: dto.slug,
                telefone: dto.telefone,
                endereco: dto.endereco,
                logo_url: dto.logo_url,
                plano: "trial",
            },
                { transaction }
            );

            const PizzariaUser = await db.PizzariaUser.create({
                pizzaria_id: pizzaria.id,
                user_id: user.id,
                role: 'dono'
            },
                { transaction }
            )
            await transaction.commit();
            return { message: "Dono e pizzaria criados com sucesso", user: user.nome, Pizzaria: pizzaria.nome }
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async registerFuncionario(dto: RegisterFuncionarioDTO, pizzariaId: string) {
        const userExistente = await db.User.findOne({ where: { email: dto.email } });
        if (userExistente) throw new Error("Usuário já existente");

        const transaction = await sequelize.transaction();

        try {
            const senha_hash = await hash(dto.senha.trim(), 10);

            const user = await db.User.create(
                {
                    nome: dto.nome,
                    email: dto.email,
                    senha_hash,
                    role: 'funcionario',
                    telefone: dto.telefone,
                },
                { transaction }
            );

            await db.PizzariaUser.create(
                {
                    pizzaria_id: pizzariaId,
                    user_id: user.id,
                    role: 'funcionario',
                },
                { transaction }
            );

            await transaction.commit();
            return { message: "Funcionário criado com sucesso", id: user.id, nome: user.nome, email: user.email, telefone: user.telefone };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async listarFuncionarios(pizzariaId: string) {
        const vinculos = await db.PizzariaUser.findAll({
            where: { pizzaria_id: pizzariaId, role: 'funcionario' },
            attributes: ['user_id'],
        });

        const userIds = vinculos.map((v) => v.user_id);
        if (userIds.length === 0) return [];

        const funcionarios = await db.User.findAll({
            where: { id: { [Op.in]: userIds } },
            attributes: ['id', 'nome', 'email', 'telefone'],
        });

        return funcionarios;
    }
}

export default new AuthService();