"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../database/models"));
const TamanhoService_1 = __importDefault(require("../services/TamanhoService"));
class TamanhoController {
    async getTamanho(req, res) {
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
            const tamanhos = await TamanhoService_1.default.getTamanho(vinculo.pizzaria_id);
            res.status(200).json(tamanhos);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async createTamanho(req, res) {
        try {
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono desse estabelecimento" });
            }
            const tamanho = await TamanhoService_1.default.createTamanho({
                nome: req.body.nome,
                pizzaria_id: vinculo.pizzaria_id
            });
            res.status(201).json(tamanho);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async reorganizarOrdem(req, res) {
        if (!req.userId) {
            return res.status(401).json({ error: "Não autenticado" });
        }
        const { id } = req.params;
        const { ordemNova } = req.body;
        try {
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono desse estabelecimento" });
            }
            const tamanho = await TamanhoService_1.default.reordenarTamanho(id, ordemNova, vinculo.pizzaria_id);
            return res.status(200).json(tamanho);
        }
        catch (error) {
            console.log("Erro ao mudar ordem:", error);
            return res.status(400).json({
                error: "Erro ao mudar ordem",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido",
            });
        }
    }
    async upadateTamanho(req, res) {
        if (!req.userId) {
            return res.status(401).json({ error: "Não aunteticado " });
        }
        const { id } = req.params;
        const { nome } = req.body;
        try {
            const vinculo = await models_1.default.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono desse estabelecimento" });
            }
            const Novonome = await TamanhoService_1.default.updateTamanho(id, nome, vinculo.pizzaria_id);
            return res.status(200).json(Novonome);
        }
        catch (error) {
            console.log("Erro ao mudar nome:", error);
            return res.status(400).json({
                error: "Erro ao mudar nome",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido",
            });
        }
    }
    async deleteTamanho(req, res) {
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
            const resultado = await TamanhoService_1.default.deleteTamanho(id, vinculo.pizzaria_id);
            return res.status(200).json(resultado);
        }
        catch (error) {
            console.log("Erro ao excluir tamanho:", error);
            return res.status(400).json({
                error: "Erro ao excluir tamanho",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido",
            });
        }
    }
}
exports.default = new TamanhoController();
