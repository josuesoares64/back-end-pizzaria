"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const models_1 = __importDefault(require("../database/models"));
class TamanhoService {
    async getTamanho(pizzariaId) {
        const tamanho = await models_1.default.Tamanho.findAll({
            where: { pizzaria_id: pizzariaId },
            attributes: ["id", "nome", "ordem"],
            order: [["ordem", "ASC"]]
        });
        return tamanho;
    }
    async createTamanho(tamanho) {
        if (!tamanho.pizzaria_id)
            throw new Error("Pizzaria não vinculada");
        const tamanhoExistente = await models_1.default.Tamanho.findOne({
            where: { nome: tamanho.nome, pizzaria_id: tamanho.pizzaria_id }
        });
        if (tamanhoExistente)
            throw new Error("Tamanho já existente");
        const totalTamanhos = await models_1.default.Tamanho.count({
            where: { pizzaria_id: tamanho.pizzaria_id }
        });
        const novoTamanho = await models_1.default.Tamanho.create({
            nome: tamanho.nome,
            pizzaria_id: tamanho.pizzaria_id,
            ordem: totalTamanhos + 1,
        });
        return novoTamanho;
    }
    async reordenarTamanho(id, ordemNova, pizzaria_id) {
        const transaction = await models_1.default.sequelize.transaction();
        try {
            const tamanho = await models_1.default.Tamanho.findOne({
                where: { id, pizzaria_id },
                transaction
            });
            if (!tamanho) {
                throw new Error("Tamanho não encontrado");
            }
            const ordemAntiga = tamanho.ordem;
            if (ordemNova === ordemAntiga) {
                await transaction.commit();
                return tamanho;
            }
            if (ordemNova > ordemAntiga) {
                await models_1.default.Tamanho.increment({ ordem: -1 }, {
                    where: {
                        pizzaria_id,
                        ordem: { [sequelize_1.Op.gt]: ordemAntiga, [sequelize_1.Op.lte]: ordemNova }
                    },
                    transaction
                });
            }
            else {
                await models_1.default.Tamanho.increment({ ordem: 1 }, {
                    where: {
                        pizzaria_id,
                        ordem: { [sequelize_1.Op.gte]: ordemNova, [sequelize_1.Op.lt]: ordemAntiga }
                    },
                    transaction
                });
            }
            tamanho.ordem = ordemNova;
            await tamanho.save({ transaction });
            await transaction.commit();
            return tamanho;
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async updateTamanho(id, nome, pizzariaId) {
        const tamanhoExistente = await models_1.default.Tamanho.findOne({
            where: { id, pizzaria_id: pizzariaId }
        });
        if (!tamanhoExistente)
            throw new Error("Tamanho não encontrado.");
        await models_1.default.Tamanho.update({ nome }, { where: { id, pizzaria_id: pizzariaId } });
        const tamanhoAtualizado = await models_1.default.Tamanho.findByPk(id);
        return tamanhoAtualizado;
    }
    async deleteTamanho(id, pizzariaId) {
        const tamanhoExistente = await models_1.default.Tamanho.findOne({
            where: { id, pizzaria_id: pizzariaId }
        });
        if (!tamanhoExistente)
            throw new Error("Tamanho não encontrado.");
        const precosVinculados = await models_1.default.ProdutoPreco.count({
            where: { tamanho_id: id }
        });
        if (precosVinculados > 0) {
            throw new Error("Não é possível excluir este tamanho porque existem produtos com preço cadastrado para ele.");
        }
        await models_1.default.Tamanho.destroy({
            where: { id, pizzaria_id: pizzariaId }
        });
        return { message: "Tamanho excluído com sucesso." };
    }
}
exports.default = new TamanhoService();
