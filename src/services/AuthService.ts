import { compare, hash } from "bcryptjs";
import db from "../database/models";
import { sign } from "jsonwebtoken";
import sequelize from "../config/database";

interface LoginDTO {
    email: string;
    senha: string;
}

interface OwnerDTO {
    nome: string;
    email: string;
    senha: string;
    nomePizzaria: string;
    slug: string;
    telefone: string;
    endereco: string;
    role: string;
    logo_url: string;
}

interface RegisterDTO {
    nome: string;
    email: string;
    senha: string;
    role: string;
    telefone?: string;
}

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
        return { message: "Dono e pizzaria criados com sucesso", user: user.nome, Pizzaria: pizzaria.nome}
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

export default new AuthService();