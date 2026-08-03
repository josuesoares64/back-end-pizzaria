"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../database/models"));
class OrderServices {
    async validarItemPertenceAPizzaria(item, pizzaria_id) {
        const idsProduto = [item.produto_id, item.produto_id_2].filter(Boolean);
        for (const produtoId of idsProduto) {
            const produto = await models_1.default.Produto.findByPk(produtoId, {
                include: [{ model: models_1.default.Categoria, as: "categoria" }],
            });
            if (!produto)
                throw new Error(`Produto ${produtoId} não encontrado`);
            if (!produto.categoria || produto.categoria.pizzaria_id !== pizzaria_id) {
                throw new Error(`Produto ${produtoId} não pertence à pizzaria informada`);
            }
        }
        if (item.tamanho_id) {
            const tamanho = await models_1.default.Tamanho.findByPk(item.tamanho_id);
            if (!tamanho || tamanho.pizzaria_id !== pizzaria_id) {
                throw new Error(`Tamanho ${item.tamanho_id} não pertence à pizzaria informada`);
            }
        }
        if (item.borda_id) {
            const borda = await models_1.default.Borda.findByPk(item.borda_id);
            if (!borda || borda.pizzaria_id !== pizzaria_id) {
                throw new Error(`Borda ${item.borda_id} não pertence à pizzaria informada`);
            }
        }
    }
    async resolveItemPrice(item) {
        const produto = await models_1.default.Produto.findByPk(item.produto_id);
        if (!produto)
            throw new Error(`Produto ${item.produto_id} não encontrado`);
        let precoBase;
        if (produto.tipo === "simples") {
            if (produto.preco === null || produto.preco === undefined) {
                throw new Error(`Produto ${produto.id} sem preço definido`);
            }
            precoBase = Number(produto.preco);
        }
        else {
            // tipo 'pizza' -> exige tamanho_id
            if (!item.tamanho_id) {
                throw new Error(`Produto ${produto.id} é pizza e exige tamanho_id`);
            }
            if (item.produto_id_2) {
                // Meio a meio: busca preço de cada sabor no tamanho escolhido e divide
                const [precoSabor1, precoSabor2] = await Promise.all([
                    models_1.default.ProdutoPreco.findOne({
                        where: { produto_id: item.produto_id, tamanho_id: item.tamanho_id },
                    }),
                    models_1.default.ProdutoPreco.findOne({
                        where: { produto_id: item.produto_id_2, tamanho_id: item.tamanho_id },
                    }),
                ]);
                if (!precoSabor1) {
                    throw new Error(`Preço não cadastrado para produto ${item.produto_id} no tamanho ${item.tamanho_id}`);
                }
                if (!precoSabor2) {
                    throw new Error(`Preço não cadastrado para produto ${item.produto_id_2} no tamanho ${item.tamanho_id}`);
                }
                precoBase = Number(precoSabor1.preco) / 2 + Number(precoSabor2.preco) / 2;
            }
            else {
                // Pizza inteira de um sabor só: preço cheio
                const produtoPreco = await models_1.default.ProdutoPreco.findOne({
                    where: { produto_id: produto.id, tamanho_id: item.tamanho_id },
                });
                if (!produtoPreco) {
                    throw new Error(`Preço não cadastrado para produto ${produto.id} no tamanho ${item.tamanho_id}`);
                }
                precoBase = Number(produtoPreco.preco);
            }
        }
        if (item.borda_id) {
            const borda = await models_1.default.Borda.findByPk(item.borda_id);
            if (!borda)
                throw new Error(`Borda ${item.borda_id} não encontrada`);
            precoBase += Number(borda.preco);
        }
        return precoBase;
    }
    async createOrder(input) {
        if (!input.itens || input.itens.length === 0) {
            throw new Error("Pedido precisa ter ao menos um item");
        }
        // Valida ANTES de abrir a transaction - falha rápido, sem tocar no banco à toa
        for (const item of input.itens) {
            await this.validarItemPertenceAPizzaria(item, input.pizzaria_id);
        }
        return models_1.default.sequelize.transaction(async (t) => {
            const itensResolvidos = [];
            let total = 0;
            for (const item of input.itens) {
                const preco_unitario = await this.resolveItemPrice(item);
                const subtotal = preco_unitario * item.quantidade;
                total += subtotal;
                itensResolvidos.push({
                    produto_id: item.produto_id,
                    produto_id_2: item.produto_id_2,
                    tamanho_id: item.tamanho_id,
                    borda_id: item.borda_id,
                    quantidade: item.quantidade,
                    preco_unitario,
                    subtotal,
                    observacoes: item.observacoes,
                });
            }
            const order = await models_1.default.Order.create({
                user_id: input.user_id,
                pizzaria_id: input.pizzaria_id,
                forma_pagamento: input.forma_pagamento,
                troco_para: input.forma_pagamento === "dinheiro" ? input.troco_para : undefined,
                observacoes: input.observacoes,
                status: "pendente",
                total,
                endereco_cep: input.endereco.cep,
                endereco_rua: input.endereco.rua,
                endereco_numero: input.endereco.numero,
                endereco_bairro: input.endereco.bairro,
                endereco_complemento: input.endereco.complemento,
                endereco_referencia: input.endereco.referencia,
            }, { transaction: t });
            await models_1.default.OrderItem.bulkCreate(itensResolvidos.map((item) => ({ ...item, order_id: order.id })), { transaction: t });
            return order;
        });
    }
    async listaPedidosCliente(user_id) {
        return models_1.default.Order.findAll({
            where: { user_id },
            include: [
                {
                    model: models_1.default.OrderItem,
                    as: "itens",
                    include: [
                        { model: models_1.default.Produto, as: "produto", attributes: ["id", "nome"] },
                        { model: models_1.default.Produto, as: "produtoSegundoSabor", attributes: ["id", "nome"] },
                        { model: models_1.default.Tamanho, as: "tamanho", attributes: ["id", "nome"] },
                        { model: models_1.default.Borda, as: "borda", attributes: ["id", "nome"] },
                    ],
                },
                { model: models_1.default.Pizzaria, as: "pizzaria", attributes: ["id", "nome"] },
            ],
            order: [["createdAt", "DESC"]],
        });
    }
    async listaPedidosPizzaria(pizzaria_id) {
        return models_1.default.Order.findAll({
            where: { pizzaria_id },
            include: [
                {
                    model: models_1.default.OrderItem,
                    as: "itens",
                    include: [
                        { model: models_1.default.Produto, as: "produto", attributes: ["id", "nome"] },
                        { model: models_1.default.Produto, as: "produtoSegundoSabor", attributes: ["id", "nome"] },
                        { model: models_1.default.Tamanho, as: "tamanho", attributes: ["id", "nome"] },
                        { model: models_1.default.Borda, as: "borda", attributes: ["id", "nome"] },
                    ],
                },
                { model: models_1.default.User, as: "cliente", attributes: ["id", "nome", "telefone"] },
            ],
            order: [["createdAt", "DESC"]],
        });
    }
    async updateStatus(orderId, novoStatus) {
        const order = await models_1.default.Order.findByPk(orderId);
        if (!order)
            throw new Error("Pedido não encontrado");
        order.status = novoStatus;
        await order.save();
        return order;
    }
}
exports.default = new OrderServices();
