import db from "../database/models";
import { ProdutoDTO } from "../types/produto.dto";

class ProdutoServices {
    async getProduto(pizzariaId: string) {
        const produtos = await db.Produto.findAll({
            include: [{
                model: db.Categoria,
                as: 'categoria',
                where: { pizzaria_id: pizzariaId },
                attributes: []
            }],
            attributes: ['id', 'nome', 'descricao', 'preco', 'imagem_url']
        });
        return produtos;
    }

    async createProduto(produto: ProdutoDTO, pizzariaId: string) {
        const categoria = await db.Categoria.findOne({
            where: { id: produto.categoria_id, pizzaria_id: pizzariaId }
        });

        if (!categoria) {
            throw new Error("Categoria não encontrada ou não pertence à sua pizzaria");
        }

        const produtoExistente = await db.Produto.findOne({
            where: { nome: produto.nome, categoria_id: produto.categoria_id }
        });
        if (produtoExistente) throw new Error("Produto já existente");

        const tipo = produto.tipo ?? 'simples';

        if (tipo === 'pizza' && produto.preco) {
            throw new Error('Produto do tipo "pizza" não deve ter preço único — use o cadastro de preços por tamanho.');
        }

        const novoProduto = await db.Produto.create({
            nome: produto.nome,
            descricao: produto.descricao,
            preco: tipo === 'pizza' ? undefined : produto.preco,
            tipo,
            categoria_id: produto.categoria_id,
            imagem_url: produto.imagem_url
        });
        return novoProduto;
    }
}

export default new ProdutoServices();