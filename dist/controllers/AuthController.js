"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthService_1 = __importDefault(require("../services/AuthService"));
const models_1 = __importDefault(require("../database/models"));
class AuthController {
    async login(req, res) {
        console.log("Corpo da requisição", req.body);
        const { email, senha } = req.body;
        console.log("Email extraído:", email);
        console.log("Senha extraída:", senha);
        try {
            const loginData = await AuthService_1.default.login({ email, senha });
            return res.status(200).send(loginData);
        }
        catch (error) {
            console.error("Erro ao fazer login:", error);
            return res.status(400).json({
                error: "Error ao fazer login",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido"
            });
        }
    }
    async register(req, res) {
        try {
            const { nome, email, senha, telefone } = req.body;
            const user = await AuthService_1.default.register({
                nome, email, senha, telefone,
                role: "cliente"
            });
            return res.status(201).json(user);
        }
        catch (error) {
            console.error("Erro ao fazer registro:", error);
            return res.status(400).json({
                error: "Erro ao registrar usuário",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido",
            });
        }
    }
    async registerOwner(req, res) {
        try {
            const { nome, email, senha, nomePizzaria, slug, telefone, endereco, role, logo_url } = req.body;
            const Owner = await AuthService_1.default.registerOwner({
                nome, email, senha, nomePizzaria, slug, telefone, endereco, logo_url,
                role: "dono"
            });
            return res.status(201).json(Owner);
        }
        catch (error) {
            console.error("Erro ao fazer registro:", error);
            return res.status(400).json({
                error: "Erro ao registrar usuário e estabelecimento",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido",
            });
        }
    }
    async registerFuncionario(req, res) {
        try {
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono de nenhuma pizzaria" });
            }
            const { nome, email, senha, telefone } = req.body;
            const funcionario = await AuthService_1.default.registerFuncionario({ nome, email, senha, telefone }, vinculo.pizzaria_id);
            return res.status(201).json(funcionario);
        }
        catch (error) {
            console.error("Erro ao registrar funcionário:", error);
            return res.status(400).json({
                error: "Erro ao registrar funcionário",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido",
            });
        }
    }
    async listarFuncionarios(req, res) {
        try {
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono de nenhuma pizzaria" });
            }
            const funcionarios = await AuthService_1.default.listarFuncionarios(vinculo.pizzaria_id);
            return res.status(200).json(funcionarios);
        }
        catch (error) {
            console.error("Erro ao listar funcionários:", error);
            return res.status(400).json({
                error: "Erro ao listar funcionários",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido",
            });
        }
    }
}
exports.default = AuthController;
