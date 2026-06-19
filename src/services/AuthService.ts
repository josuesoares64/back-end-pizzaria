import { compare, hash } from "bcryptjs";
import db from "../database/models";
import { sign } from "jsonwebtoken";

interface LoginDTO {
    email: string;
    senha: string;
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
}

export default new AuthService();