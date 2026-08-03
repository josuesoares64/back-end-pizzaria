"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../database/models"));
const BordaService_1 = __importDefault(require("../services/BordaService"));
class BordaController {
    async getBorda(req, res) {
        if (!req.userId) {
            return res.status(401).json({ error: "Não autenticado" });
        }
        try {
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: { user_id: req.userId }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não tem acesso a nenhuma pizzaria" });
            }
            if (vinculo.role !== 'dono' && vinculo.role !== 'funcionario') {
                return res.status(403).json({ error: "Usuário sem permissão para esta ação" });
            }
            const borda = await BordaService_1.default.getBorda(vinculo.pizzaria_id);
            res.status(200).json(borda);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async createBorda(req, res) {
        if (!req.userId) {
            return res.status(401).json({ error: "Não autenticado" });
        }
        try {
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono desse estabelecimento" });
            }
            const borda = await BordaService_1.default.createBorda({
                nome: req.body.nome,
                preco: req.body.preco,
                pizzaria_id: vinculo.pizzaria_id,
            });
            res.status(201).json(borda);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updateBorda(req, res) {
        if (!req.userId) {
            return res.status(401).json({ error: "Não autenticado" });
        }
        try {
            const id = req.params.id;
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: {
                    user_id: req.userId,
                    role: 'dono'
                }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não tem acesso a nenhuma pizzaria." });
            }
            const bordaAtualizada = await BordaService_1.default.updateBorda(id, {
                nome: req.body.nome,
                preco: req.body.preco,
            }, vinculo.pizzaria_id);
            res.status(200).json(bordaAtualizada);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async toggleStatusBorda(req, res) {
        if (!req.userId) {
            return res.status(401).json({ error: "Não autenticado" });
        }
        try {
            const id = req.params.id;
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: { user_id: req.userId }
            });
            if (!vinculo) {
                return res.status(403).json({ error: 'Usuário não tem acesso a nenhuma pizzaria' });
            }
            if (vinculo.role !== 'dono' && vinculo.role !== 'funcionario') {
                return res.status(403).json({ error: 'Usuário sem permissão para esta ação' });
            }
            const bordaAtualizada = await BordaService_1.default.toggleStatusBorda(id, req.body.ativo, vinculo.pizzaria_id);
            res.status(200).json(bordaAtualizada);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deleteBorda(req, res) {
        if (!req.userId) {
            return res.status(401).json({ error: "Não autenticado" });
        }
        const { id } = req.params;
        try {
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono desse estabelecimento" });
            }
            const resultado = await BordaService_1.default.deleteBorda(id, vinculo.pizzaria_id);
            return res.status(200).json(resultado);
        }
        catch (error) {
            console.log("Error ao excluir a borda:", error);
            return res.status(400).json({
                error: "Error ao excluir borda.",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido.",
            });
        }
    }
}
exports.default = new BordaController();
