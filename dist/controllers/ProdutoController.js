"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../database/models"));
const ProdutoServices_1 = __importDefault(require("../services/ProdutoServices"));
const sequelize_1 = require("sequelize");
const StorageService_1 = __importDefault(require("../services/StorageService"));
class ProdutoController {
    async getProduto(req, res) {
        try {
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: {
                    user_id: req.userId,
                    role: { [sequelize_1.Op.in]: ['dono', 'funcionario'] }
                }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não tem acesso a nenhuma pizzaria" });
            }
            const produtos = await ProdutoServices_1.default.getProduto(vinculo.pizzaria_id);
            res.status(200).json(produtos);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async uploadImagem(req, res) {
        try {
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono de nenhuma pizzaria" });
            }
            const { id } = req.params;
            if (!req.file) {
                return res.status(400).json({ error: "Nenhuma imagem enviada" });
            }
            const imagem_url = await StorageService_1.default.uploadImagem(req.file, vinculo.pizzaria_id, `produtos/${id}`);
            const produto = await ProdutoServices_1.default.updateProduto(id, { imagem_url }, vinculo.pizzaria_id);
            res.status(200).json(produto);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async createProduto(req, res) {
        try {
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono de nenhuma pizzaria" });
            }
            const produto = await ProdutoServices_1.default.createProduto({
                nome: req.body.nome,
                descricao: req.body.descricao,
                preco: req.body.preco,
                tipo: req.body.tipo,
                categoria_id: req.body.categoria_id,
                imagem_url: req.body.imagem_url
            }, vinculo.pizzaria_id);
            res.status(201).json(produto);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updateProduto(req, res) {
        try {
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono de nenhuma pizzaria" });
            }
            const { id } = req.params;
            const produto = await ProdutoServices_1.default.updateProduto(id, req.body, vinculo.pizzaria_id);
            res.status(200).json(produto);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updateStatusProduto(req, res) {
        try {
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: {
                    user_id: req.userId,
                    role: { [sequelize_1.Op.in]: ['dono', 'funcionario'] }
                }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não tem acesso a nenhuma pizzaria" });
            }
            const { id } = req.params;
            const { disponivel } = req.body;
            const produto = await ProdutoServices_1.default.updateStatusProduto(id, disponivel, vinculo.pizzaria_id);
            res.status(200).json(produto);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deleteProduto(req, res) {
        try {
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono de nenhuma pizzaria" });
            }
            const { id } = req.params;
            const resultado = await ProdutoServices_1.default.deleteProduto(id, vinculo.pizzaria_id);
            res.status(200).json(resultado);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.default = new ProdutoController();
