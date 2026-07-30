"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../database/models"));
const validarProdutoDaPizzaria = async (produtoId, pizzariaId) => {
    const produto = await models_1.default.Produto.findOne({
        where: { id: produtoId },
        include: [{
                model: models_1.default.Categoria,
                as: 'categoria',
                where: { pizzaria_id: pizzariaId },
                attributes: []
            }]
    });
    if (!produto) {
        throw new Error('Produto não encontrado nesta pizzaria.');
    }
    return produto;
};
const validarTamanhosDaPizzaria = async (tamanhoIds, pizzariaId) => {
    const tamanhos = await models_1.default.Tamanho.count({
        where: {
            id: tamanhoIds,
            pizzaria_id: pizzariaId
        }
    });
    if (tamanhos !== tamanhoIds.length) {
        throw new Error('Um ou mais tamanhos não pertencem a esta pizzaria.');
    }
};
const vincularTamanhos = async (produtoId, tamanhoIds, pizzariaId) => {
    await validarProdutoDaPizzaria(produtoId, pizzariaId);
    await validarTamanhosDaPizzaria(tamanhoIds, pizzariaId);
    const jaVinculados = await models_1.default.ProdutoPreco.findAll({
        where: { produto_id: produtoId, tamanho_id: tamanhoIds },
        attributes: ['tamanho_id']
    });
    const idsJaVinculados = jaVinculados.map((v) => v.tamanho_id);
    const novosIds = tamanhoIds.filter(id => !idsJaVinculados.includes(id));
    if (novosIds.length === 0) {
        return listarPrecos(produtoId, pizzariaId);
    }
    await models_1.default.ProdutoPreco.bulkCreate(novosIds.map(tamanho_id => ({ produto_id: produtoId, tamanho_id, preco: null })));
    return listarPrecos(produtoId, pizzariaId);
};
const desvincularTamanho = async (produtoId, tamanhoId, pizzariaId) => {
    await validarProdutoDaPizzaria(produtoId, pizzariaId);
    const deletado = await models_1.default.ProdutoPreco.destroy({
        where: { produto_id: produtoId, tamanho_id: tamanhoId }
    });
    if (deletado === 0) {
        throw new Error('Vínculo não encontrado.');
    }
};
const listarPrecos = async (produtoId, pizzariaId) => {
    await validarProdutoDaPizzaria(produtoId, pizzariaId);
    return models_1.default.ProdutoPreco.findAll({
        where: { produto_id: produtoId },
        include: [{
                model: models_1.default.Tamanho,
                as: 'tamanho',
                attributes: ['id', 'nome', 'ordem']
            }],
        order: [[{ model: models_1.default.Tamanho, as: 'tamanho' }, 'ordem', 'ASC']]
    });
};
const atualizarPrecos = async (produtoId, precos, pizzariaId) => {
    await validarProdutoDaPizzaria(produtoId, pizzariaId);
    for (const item of precos) {
        const [linhasAfetadas] = await models_1.default.ProdutoPreco.update({ preco: item.preco }, { where: { produto_id: produtoId, tamanho_id: item.tamanho_id } });
        if (linhasAfetadas === 0) {
            throw new Error(`Tamanho ${item.tamanho_id} não está vinculado a este produto. Vincule antes de definir o preço.`);
        }
    }
    return listarPrecos(produtoId, pizzariaId);
};
exports.default = {
    vincularTamanhos,
    desvincularTamanho,
    listarPrecos,
    atualizarPrecos
};
