import db from '../database/models';

const validarProdutoDaPizzaria = async (produtoId: string, pizzariaId: string) => {
    const produto = await db.Produto.findOne({
        where: { id: produtoId },
        include: [{
            model: db.Categoria,
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

const validarTamanhosDaPizzaria = async (tamanhoIds: string[], pizzariaId: string) => {
    const tamanhos = await db.Tamanho.count({
        where: {
            id: tamanhoIds,
            pizzaria_id: pizzariaId
        }
    });

    if (tamanhos !== tamanhoIds.length) {
        throw new Error('Um ou mais tamanhos não pertencem a esta pizzaria.');
    }
};

const vincularTamanhos = async (produtoId: string, tamanhoIds: string[], pizzariaId: string) => {
    await validarProdutoDaPizzaria(produtoId, pizzariaId);
    await validarTamanhosDaPizzaria(tamanhoIds, pizzariaId);

    const jaVinculados = await db.ProdutoPreco.findAll({
        where: { produto_id: produtoId, tamanho_id: tamanhoIds },
        attributes: ['tamanho_id']
    });
    const idsJaVinculados = jaVinculados.map((v: any) => v.tamanho_id);

    const novosIds = tamanhoIds.filter(id => !idsJaVinculados.includes(id));

    if (novosIds.length === 0) {
        return listarPrecos(produtoId, pizzariaId);
    }

    await db.ProdutoPreco.bulkCreate(
        novosIds.map(tamanho_id => ({ produto_id: produtoId, tamanho_id, preco: null }))
    );

    return listarPrecos(produtoId, pizzariaId);
};

const desvincularTamanho = async (produtoId: string, tamanhoId: string, pizzariaId: string) => {
    await validarProdutoDaPizzaria(produtoId, pizzariaId);

    const deletado = await db.ProdutoPreco.destroy({
        where: { produto_id: produtoId, tamanho_id: tamanhoId }
    });

    if (deletado === 0) {
        throw new Error('Vínculo não encontrado.');
    }
};

const listarPrecos = async (produtoId: string, pizzariaId: string) => {
    await validarProdutoDaPizzaria(produtoId, pizzariaId);

    return db.ProdutoPreco.findAll({
        where: { produto_id: produtoId },
        include: [{
            model: db.Tamanho,
            as: 'tamanho',
            attributes: ['id', 'nome', 'ordem']
        }],
        order: [[{ model: db.Tamanho, as: 'tamanho' }, 'ordem', 'ASC']]
    });
};

const atualizarPrecos = async (
    produtoId: string,
    precos: { tamanho_id: string; preco: number }[],
    pizzariaId: string
) => {
    await validarProdutoDaPizzaria(produtoId, pizzariaId);

    for (const item of precos) {
        const [linhasAfetadas] = await db.ProdutoPreco.update(
            { preco: item.preco },
            { where: { produto_id: produtoId, tamanho_id: item.tamanho_id } }
        );

        if (linhasAfetadas === 0) {
            throw new Error(
                `Tamanho ${item.tamanho_id} não está vinculado a este produto. Vincule antes de definir o preço.`
            );
        }
    }

    return listarPrecos(produtoId, pizzariaId);
};

export default {
    vincularTamanhos,
    desvincularTamanho,
    listarPrecos,
    atualizarPrecos
};