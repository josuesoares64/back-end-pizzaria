"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../database/models"));
class BordaService {
    async getBorda(pizzariaId) {
        const bordas = await models_1.default.Borda.findAll({
            where: { pizzaria_id: pizzariaId },
            attributes: ["id", "nome", "preco", "pizzaria_id", "ativo"]
        });
        return bordas;
    }
    async createBorda(borda) {
        if (!borda.pizzaria_id)
            throw new Error("Pizzaria não vinculada");
        const bordaExistente = await models_1.default.Borda.findOne({
            where: { nome: borda.nome, pizzaria_id: borda.pizzaria_id }
        });
        if (bordaExistente)
            throw new Error("Borda já existente");
        const novaBorda = await models_1.default.Borda.create({
            nome: borda.nome,
            pizzaria_id: borda.pizzaria_id,
            preco: borda.preco,
            ativo: true
        });
        return novaBorda;
    }
    async updateBorda(id, dados, pizzariaId) {
        const bordaExistente = await models_1.default.Borda.findOne({
            where: { id, pizzaria_id: pizzariaId }
        });
        if (!bordaExistente)
            throw new Error("Borda não encontrada.");
        await models_1.default.Borda.update(dados, { where: { id, pizzaria_id: pizzariaId } });
        const bordaAtualizada = await models_1.default.Borda.findByPk(id);
        return bordaAtualizada;
    }
    async toggleStatusBorda(id, ativo, pizzariaId) {
        const bordaExistente = await models_1.default.Borda.findOne({
            where: { id, pizzaria_id: pizzariaId }
        });
        if (!bordaExistente)
            throw new Error("Borda não encontrada.");
        await models_1.default.Borda.update({
            ativo: ativo,
        }, { where: { id, pizzaria_id: pizzariaId } });
        const bordaAtualizada = await models_1.default.Borda.findByPk(id);
        return bordaAtualizada;
    }
    async deleteBorda(id, pizzariaId) {
        const bordaExistente = await models_1.default.Borda.findOne({
            where: { id, pizzaria_id: pizzariaId }
        });
        if (!bordaExistente)
            throw new Error("Borda não encontrada.");
        const bordaVinculados = await models_1.default.OrderItem.count({
            where: { borda_id: id }
        });
        if (bordaVinculados > 0) {
            throw new Error("Não é possível excluir esta borda porque existem Ordem vinculadas.");
        }
        await models_1.default.Borda.destroy({
            where: { id, pizzaria_id: pizzariaId }
        });
        return { message: "Borda excluída com sucesso." };
    }
}
exports.default = new BordaService();
