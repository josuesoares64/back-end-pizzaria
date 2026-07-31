import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { LoginDTO, OwnerDTO, RegisterDTO, RegisterFuncionarioDTO } from "../types/auth.dto";
import db from "../database/models";

class AuthController {
    async login(req: Request<{}, {}, LoginDTO>, res: Response) {
        console.log("Corpo da requisição", req.body);
        const { email, senha } = req.body;
        console.log("Email extraído:", email);
        console.log("Senha extraída:", senha);

        try {
            const loginData = await AuthService.login({ email, senha });
            return res.status(200).send(loginData);
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            return res.status(400).json({
                error: "Error ao fazer login",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido"
            })
        }
    }

    async register(req: Request<{}, {}, RegisterDTO>, res: Response) {
        try {
            const { nome, email, senha, telefone } = req.body
            const user = await AuthService.register({
                nome, email, senha, telefone,
                role: "cliente"
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

    async registerOwner(req: Request<{}, {}, OwnerDTO>, res: Response) {
        try {
            const { nome, email, senha, nomePizzaria, slug, telefone, endereco, role, logo_url } = req.body
            const Owner = await AuthService.registerOwner({
                nome, email, senha, nomePizzaria, slug, telefone, endereco, logo_url,
                role: "dono"
            });
            return res.status(201).json(Owner);
        } catch (error) {
            console.error("Erro ao fazer registro:", error);
            return res.status(400).json({
                error: "Erro ao registrar usuário e estabelecimento",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido",
            })
        }
    }

    async registerFuncionario(req: Request<{}, {}, RegisterFuncionarioDTO>, res: Response) {
        try {
            const vinculo = await db.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono de nenhuma pizzaria" });
            }

            const { nome, email, senha, telefone } = req.body;
            const funcionario = await AuthService.registerFuncionario(
                { nome, email, senha, telefone },
                vinculo.pizzaria_id
            );
            return res.status(201).json(funcionario);
        } catch (error) {
            console.error("Erro ao registrar funcionário:", error);
            return res.status(400).json({
                error: "Erro ao registrar funcionário",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido",
            })
        }
    }

    async listarFuncionarios(req: Request, res: Response) {
        try {
            const vinculo = await db.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono de nenhuma pizzaria" });
            }

            const funcionarios = await AuthService.listarFuncionarios(vinculo.pizzaria_id);
            return res.status(200).json(funcionarios);
        } catch (error) {
            console.error("Erro ao listar funcionários:", error);
            return res.status(400).json({
                error: "Erro ao listar funcionários",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido",
            })
        }
    }
}

export default AuthController