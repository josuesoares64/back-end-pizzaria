"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const models_1 = __importDefault(require("../database/models"));
const jsonwebtoken_1 = require("jsonwebtoken");
const database_1 = __importDefault(require("../config/database"));
class AuthService {
    async login(dto) {
        const user = await models_1.default.User.findOne({
            attributes: ["id", "email", "senha_hash", "role"],
            where: { email: dto.email },
        });
        if (!user)
            throw new Error("Usuário inválido");
        const senhaDigitada = dto.senha.trim();
        const senhasIguais = await (0, bcryptjs_1.compare)(senhaDigitada, user.senha_hash);
        if (!senhasIguais)
            throw new Error("Senha inválida");
        const accessToken = (0, jsonwebtoken_1.sign)({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return { accessToken };
    }
    async register(dto) {
        const userExists = await models_1.default.User.findOne({ where: { email: dto.email } });
        if (userExists)
            throw new Error("Usuário já existente");
        const senha_hash = await (0, bcryptjs_1.hash)(dto.senha.trim(), 10);
        const user = await models_1.default.User.create({
            nome: dto.nome,
            email: dto.email,
            senha_hash,
            role: dto.role,
            telefone: dto.telefone,
        });
        return { message: "Usuário criado com sucesso", userId: user.nome };
    }
    async registerOwner(dto) {
        const userExistente = await models_1.default.User.findOne({ where: { email: dto.email } });
        if (userExistente)
            throw new Error("Usuário já existente");
        const transaction = await database_1.default.transaction();
        const slugExistente = await models_1.default.Pizzaria.findOne({ where: { slug: dto.slug } });
        if (slugExistente)
            throw new Error("Slug já existente");
        try {
            const senha_hash = await (0, bcryptjs_1.hash)(dto.senha.trim(), 10);
            const user = await models_1.default.User.create({
                nome: dto.nome,
                email: dto.email,
                senha_hash,
                role: dto.role,
                telefone: dto.telefone
            }, { transaction: transaction });
            const pizzaria = await models_1.default.Pizzaria.create({
                nome: dto.nomePizzaria,
                slug: dto.slug,
                telefone: dto.telefone,
                endereco: dto.endereco,
                logo_url: dto.logo_url,
                plano: "trial",
            }, { transaction });
            const PizzariaUser = await models_1.default.PizzariaUser.create({
                pizzaria_id: pizzaria.id,
                user_id: user.id,
                role: 'dono'
            }, { transaction });
            await transaction.commit();
            return { message: "Dono e pizzaria criados com sucesso", user: user.nome, Pizzaria: pizzaria.nome };
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}
exports.default = new AuthService();
