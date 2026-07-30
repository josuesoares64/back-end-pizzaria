"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../database/models"));
class ProdutoServices {
    async getProduto(pizzariaId) {
        const produtos = await models_1.default.Produto.findAll({
            where: { excluido: false },
            include: [{
                    model: models_1.default.Categoria,
                    as: 'categoria',
                    where: { pizzaria_id: pizzariaId },
                    attributes: []
                }],
            attributes: ['id', 'nome', 'descricao', 'preco', 'tipo', 'categoria_id', 'imagem_url', 'disponivel']
        });
        return produtos;
    }
    async createProduto(produto, pizzariaId) {
        const categoria = await models_1.default.Categoria.findOne({
            where: { id: produto.categoria_id, pizzaria_id: pizzariaId }
        });
        if (!categoria) {
            throw new Error("Categoria não encontrada ou não pertence à sua pizzaria");
        }
        const produtoExistente = await models_1.default.Produto.findOne({
            where: { nome: produto.nome, categoria_id: produto.categoria_id, excluido: false }
        });
        if (produtoExistente)
            throw new Error("Produto já existente");
        const tipo = produto.tipo ?? 'simples';
        if (tipo === 'pizza' && produto.preco) {
            throw new Error('Produto do tipo "pizza" não deve ter preço único — use o cadastro de preços por tamanho.');
        }
        const novoProduto = await models_1.default.Produto.create({
            nome: produto.nome,
            descricao: produto.descricao,
            preco: tipo === 'pizza' ? undefined : produto.preco,
            tipo,
            categoria_id: produto.categoria_id,
            imagem_url: produto.imagem_url
        });
        return novoProduto;
    }
    async updateProduto(id, produto, pizzariaId) {
        const produtoExistente = await models_1.default.Produto.findOne({
            where: { id },
            include: [{
                    model: models_1.default.Categoria,
                    as: 'categoria',
                    where: { pizzaria_id: pizzariaId },
                    attributes: []
                }]
        });
        if (!produtoExistente)
            throw new Error("Produto não encontrado ou não pertence à sua pizzaria");
        const camposPermitidos = ['nome', 'descricao', 'preco', 'imagem_url', 'disponivel'];
        const dadosParaAtualizar = {};
        for (const campo of camposPermitidos) {
            if (produto[campo] !== undefined) {
                dadosParaAtualizar[campo] = produto[campo];
            }
        }
        await models_1.default.Produto.update(dadosParaAtualizar, { where: { id } });
        return models_1.default.Produto.findByPk(id);
    }
    // Update isolado pra status: NÃO roda a validação completa do model
    // (ex: "simples exige preço") já que aqui só o campo `disponivel` muda.
    async updateStatusProduto(id, disponivel, pizzariaId) {
        const produtoExistente = await models_1.default.Produto.findOne({
            where: { id },
            include: [{
                    model: models_1.default.Categoria,
                    as: 'categoria',
                    where: { pizzaria_id: pizzariaId },
                    attributes: []
                }]
        });
        if (!produtoExistente)
            throw new Error("Produto não encontrado ou não pertence à sua pizzaria");
        await models_1.default.Produto.update({ disponivel }, { where: { id }, validate: false });
        return models_1.default.Produto.findByPk(id);
    }
    // Soft delete: marca excluido=true em vez de apagar a linha.
    // Preserva a integridade de pedidos antigos que referenciam esse produto.
    async deleteProduto(id, pizzariaId) {
        const produtoExistente = await models_1.default.Produto.findOne({
            where: { id },
            include: [{
                    model: models_1.default.Categoria,
                    as: 'categoria',
                    where: { pizzaria_id: pizzariaId },
                    attributes: []
                }]
        });
        if (!produtoExistente)
            throw new Error("Produto não encontrado ou não pertence à sua pizzaria");
        await models_1.default.Produto.update({ excluido: true }, { where: { id }, validate: false });
        return { id };
    }
}
exports.default = new ProdutoServices();
