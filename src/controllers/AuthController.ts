import { Request, Response } from "express";
import AuthService from "../services/AuthService";

interface RegisterBody {
    nome: string;
    email: string;
    senha: string;
    telefone?: string;
}

interface LoginBody {
    email: string;
    senha: string;
}

class AuthController {
    async login(req: Request<{}, {}, LoginBody>, res: Response) {
        console.log("Corpo da requisição", req.body);
        const { email, senha } = req.body;
        console.log("Email extraído:", email);
        console.log("Senha extraída:", senha);

        try {
            const loginData = await AuthService.login({ email, senha});
            return res.status(200).send(loginData);
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            return res.status(400).json({
                error: "Error ao fazer login",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido"
            })
        }
    }

    async register( req: Request<{}, {}, RegisterBody>, res: Response) {
        try {
            const { nome, email, senha, telefone } = req.body
            const user = await AuthService.register({
                nome, email, senha, telefone,
                role: "CLIENTE"
            })
            return res.status(201).json(user);
        } catch (error) {
            console.error("Erro ao fazer registro:", error);
            return res.status(400).json({
                error: "Erro ao registrar usuário",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido",
            })
        }
    }
}

export default AuthController