"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../database/models"));
class CategoriaServices {
    async getCategorias(pizzariaId) {
        const categorias = await models_1.default.Categoria.findAll({
            where: { pizzaria_id: pizzariaId },
            attributes: ['id', 'nome', 'ativo'],
        });
        return categorias;
    }
    async createCategoria(categoria) {
        if (!categoria.pizzaria_id)
            throw new Error("Pizzaria não vínculada");
        const categoriaExistente = await models_1.default.Categoria.findOne({ where: { nome: categoria.nome, pizzaria_id: categoria.pizzaria_id } });
        if (categoriaExistente)
            throw new Error("Categoria já existente");
        const novaCategoria = await models_1.default.Categoria.create({
            nome: categoria.nome,
            pizzaria_id: categoria.pizzaria_id,
            ativo: categoria.ativo,
        });
        return novaCategoria;
    }
    async updateCategoria(id, categoria, pizzariaId) {
        const categoriaExistente = await models_1.default.Categoria.findOne({ where: { id, pizzaria_id: pizzariaId } });
        if (!categoriaExistente)
            throw new Error("Categoria não encontrada.");
        const dadosAtualizado = await models_1.default.Categoria.update({
            nome: categoria.nome,
            ativo: categoria.ativo,
        }, {
            where: { id }
        });
        return dadosAtualizado;
    }
    async updateCategoriaStatus(id, ativo, pizzariaId) {
        const categoriaExistente = await models_1.default.Categoria.findOne({ where: { id, pizzaria_id: pizzariaId } });
        if (!categoriaExistente)
            throw new Error("Categoria não encontrada.");
        const dadosAtualizado = await models_1.default.Categoria.update({
            ativo: ativo,
        }, { where: { id } });
        return dadosAtualizado;
    }
}
exports.default = new CategoriaServices();
