import db from "../database/models";
import { ProdutoDTO } from "../types/produto.dto";

class ProdutoServices {
    async getProduto(pizzariaId: string) {
        const produtos = await db.Produto.findAll({
            where: { excluido: false },
            include: [{
                model: db.Categoria,
                as: 'categoria',
                where: { pizzaria_id: pizzariaId },
                attributes: []
            }],
            attributes: ['id', 'nome', 'descricao', 'preco', 'tipo', 'categoria_id', 'imagem_url', 'disponivel']
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
            where: { nome: produto.nome, categoria_id: produto.categoria_id, excluido: false }
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

    async updateProduto(id: string, produto: Partial<ProdutoDTO> & { disponivel?: boolean }, pizzariaId: string) {
        const produtoExistente = await db.Produto.findOne({
            where: { id },
            include: [{
                model: db.Categoria,
                as: 'categoria',
                where: { pizzaria_id: pizzariaId },
                attributes: []
            }]
        });

        if (!produtoExistente) throw new Error("Produto não encontrado ou não pertence à sua pizzaria");

        const camposPermitidos = ['nome', 'descricao', 'preco', 'imagem_url', 'disponivel'] as const;
        const dadosParaAtualizar: Record<string, unknown> = {};

        for (const campo of camposPermitidos) {
            if (produto[campo] !== undefined) {
                dadosParaAtualizar[campo] = produto[campo];
            }
        }

        await db.Produto.update(dadosParaAtualizar, { where: { id } });
        return db.Produto.findByPk(id);
    }

    // Update isolado pra status: NÃO roda a validação completa do model
    // (ex: "simples exige preço") já que aqui só o campo `disponivel` muda.
    async updateStatusProduto(id: string, disponivel: boolean, pizzariaId: string) {
        const produtoExistente = await db.Produto.findOne({
            where: { id },
            include: [{
                model: db.Categoria,
                as: 'categoria',
                where: { pizzaria_id: pizzariaId },
                attributes: []
            }]
        });

        if (!produtoExistente) throw new Error("Produto não encontrado ou não pertence à sua pizzaria");

        await db.Produto.update(
            { disponivel },
            { where: { id }, validate: false }
        );
        return db.Produto.findByPk(id);
    }

    // Soft delete: marca excluido=true em vez de apagar a linha.
    // Preserva a integridade de pedidos antigos que referenciam esse produto.
    async deleteProduto(id: string, pizzariaId: string) {
        const produtoExistente = await db.Produto.findOne({
            where: { id },
            include: [{
                model: db.Categoria,
                as: 'categoria',
                where: { pizzaria_id: pizzariaId },
                attributes: []
            }]
        });

        if (!produtoExistente) throw new Error("Produto não encontrado ou não pertence à sua pizzaria");

        await db.Produto.update(
            { excluido: true },
            { where: { id }, validate: false }
        );
        return { id };
    }
}

export default new ProdutoServices();