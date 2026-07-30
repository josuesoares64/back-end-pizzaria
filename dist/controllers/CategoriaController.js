"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoriaServices_1 = __importDefault(require("../services/CategoriaServices"));
const models_1 = __importDefault(require("../database/models"));
const sequelize_1 = require("sequelize");
class CategoriaController {
    async getCategoria(req, res) {
        try {
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: {
                    user_id: req.userId,
                    role: { [sequelize_1.Op.in]: ['dono', 'funcionario'] }
                }
            });
            if (!vinculo) {
                return res.status(403).json({ error: 'Usuário não tem acesso a nenhuma pizzaria' });
            }
            const categorias = await CategoriaServices_1.default.getCategorias(vinculo.pizzaria_id);
            res.status(200).json(categorias);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async createCategoria(req, res) {
        try {
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });
            if (!vinculo) {
                return res.status(403).json({ error: 'Usuário não é dono de nenhuma pizzaria' });
            }
            const categoria = await CategoriaServices_1.default.createCategoria({
                nome: req.body.nome,
                pizzaria_id: vinculo.pizzaria_id,
                ativo: req.body.ativo,
            });
            res.status(201).json(categoria);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updateCategoria(req, res) {
        try {
            const id = req.params.id;
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: {
                    user_id: req.userId,
                    role: 'dono'
                }
            });
            if (!vinculo) {
                return res.status(403).json({ error: 'Usuário não tem acesso a nenhuma pizzaria' });
            }
            const categoriaAtualizada = await CategoriaServices_1.default.updateCategoria(id, {
                nome: req.body.nome,
                ativo: req.body.ativo,
            }, vinculo.pizzaria_id);
            res.status(200).json(categoriaAtualizada);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updateCategoriaStatus(req, res) {
        try {
            const id = req.params.id;
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: {
                    user_id: req.userId,
                    role: { [sequelize_1.Op.in]: ['dono', 'funcionario'] }
                }
            });
            if (!vinculo) {
                return res.status(403).json({ error: 'Usuário não tem acesso a nenhuma pizzaria' });
            }
            const categoriaAtualizada = await CategoriaServices_1.default.updateCategoriaStatus(id, req.body.ativo, vinculo.pizzaria_id);
            res.status(200).json(categoriaAtualizada);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.default = new CategoriaController();
