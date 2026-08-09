import db from "../database/models";
import { Transaction } from "sequelize";
import { OrderStatus } from "../database/models/Order";
import { CartItemInput, CreateOrderInput } from "../types/order.dto";

class OrderServices {

  async validarItemPertenceAPizzaria(item: CartItemInput, pizzaria_id: string) {
    const idsProduto = [item.produto_id, item.produto_id_2].filter(Boolean) as string[];

    for (const produtoId of idsProduto) {
      const produto = await db.Produto.findByPk(produtoId, {
        include: [{ model: db.Categoria, as: "categoria" }],
      });
      if (!produto) throw new Error(`Produto ${produtoId} não encontrado`);
      if (!produto.categoria || produto.categoria.pizzaria_id !== pizzaria_id) {
        throw new Error(`Produto ${produtoId} não pertence à pizzaria informada`);
      }
    }

    if (item.tamanho_id) {
      const tamanho = await db.Tamanho.findByPk(item.tamanho_id);
      if (!tamanho || tamanho.pizzaria_id !== pizzaria_id) {
        throw new Error(`Tamanho ${item.tamanho_id} não pertence à pizzaria informada`);
      }
    }

    if (item.borda_id) {
      const borda = await db.Borda.findByPk(item.borda_id);
      if (!borda || borda.pizzaria_id !== pizzaria_id) {
        throw new Error(`Borda ${item.borda_id} não pertence à pizzaria informada`);
      }
    }
  }

  async resolveItemPrice(item: CartItemInput) {
    const produto = await db.Produto.findByPk(item.produto_id);
    if (!produto) throw new Error(`Produto ${item.produto_id} não encontrado`);

    let precoBase: number;

    if (produto.tipo === "simples") {
      if (produto.preco === null || produto.preco === undefined) {
        throw new Error(`Produto ${produto.id} sem preço definido`);
      }
      precoBase = Number(produto.preco);
    } else {
      // tipo 'pizza' -> exige tamanho_id
      if (!item.tamanho_id) {
        throw new Error(`Produto ${produto.id} é pizza e exige tamanho_id`);
      }

      if (item.produto_id_2) {
        // Meio a meio: busca preço de cada sabor no tamanho escolhido e divide
        const [precoSabor1, precoSabor2] = await Promise.all([
          db.ProdutoPreco.findOne({
            where: { produto_id: item.produto_id, tamanho_id: item.tamanho_id },
          }),
          db.ProdutoPreco.findOne({
            where: { produto_id: item.produto_id_2, tamanho_id: item.tamanho_id },
          }),
        ]);

        if (!precoSabor1) {
          throw new Error(
            `Preço não cadastrado para produto ${item.produto_id} no tamanho ${item.tamanho_id}`
          );
        }
        if (!precoSabor2) {
          throw new Error(
            `Preço não cadastrado para produto ${item.produto_id_2} no tamanho ${item.tamanho_id}`
          );
        }

        precoBase = Number(precoSabor1.preco) / 2 + Number(precoSabor2.preco) / 2;
      } else {
        // Pizza inteira de um sabor só: preço cheio
        const produtoPreco = await db.ProdutoPreco.findOne({
          where: { produto_id: produto.id, tamanho_id: item.tamanho_id },
        });
        if (!produtoPreco) {
          throw new Error(
            `Preço não cadastrado para produto ${produto.id} no tamanho ${item.tamanho_id}`
          );
        }
        precoBase = Number(produtoPreco.preco);
      }
    }

    if (item.borda_id) {
      const borda = await db.Borda.findByPk(item.borda_id);
      if (!borda) throw new Error(`Borda ${item.borda_id} não encontrada`);
      precoBase += Number(borda.preco);
    }

    return precoBase;
  }

  async createOrder(input: CreateOrderInput) {
    if (!input.itens || input.itens.length === 0) {
      throw new Error("Pedido precisa ter ao menos um item");
    }

    // Validação condicional por tipo de pedido — logo no início, fail-fast
    if (input.tipo_pedido === "entrega" && !input.endereco) {
      throw new Error("Endereço é obrigatório para pedidos de entrega");
    }
    if (input.tipo_pedido === "mesa" && !input.numero_mesa?.trim()) {
      throw new Error("Número da mesa é obrigatório para pedidos na mesa");
    }

    // Valida ANTES de abrir a transaction - falha rápido, sem tocar no banco à toa
    for (const item of input.itens) {
      await this.validarItemPertenceAPizzaria(item, input.pizzaria_id);
    }

    return db.sequelize.transaction(async (t: Transaction) => {
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

      const order = await db.Order.create(
        {
          user_id: input.user_id,
          pizzaria_id: input.pizzaria_id,
          forma_pagamento: input.forma_pagamento,
          troco_para: input.forma_pagamento === "dinheiro" ? input.troco_para : undefined,
          observacoes: input.observacoes,
          status: "pendente",
          total,
          tipo_pedido: input.tipo_pedido,
          numero_mesa: input.tipo_pedido === "mesa" ? input.numero_mesa : undefined,
          endereco_cep: input.tipo_pedido === "entrega" ? input.endereco?.cep : undefined,
          endereco_rua: input.tipo_pedido === "entrega" ? input.endereco?.rua : undefined,
          endereco_numero: input.tipo_pedido === "entrega" ? input.endereco?.numero : undefined,
          endereco_bairro: input.tipo_pedido === "entrega" ? input.endereco?.bairro : undefined,
          endereco_complemento: input.tipo_pedido === "entrega" ? input.endereco?.complemento : undefined,
          endereco_referencia: input.tipo_pedido === "entrega" ? input.endereco?.referencia : undefined,
        },
        { transaction: t }
      );

      await db.OrderItem.bulkCreate(
        itensResolvidos.map((item) => ({ ...item, order_id: order.id })),
        { transaction: t }
      );

      return order;
    });
  }

  async listaPedidosCliente(user_id: string) {
    return db.Order.findAll({
      where: { user_id },
      include: [
        {
          model: db.OrderItem,
          as: "itens",
          include: [
            { model: db.Produto, as: "produto", attributes: ["id", "nome"] },
            { model: db.Produto, as: "produtoSegundoSabor", attributes: ["id", "nome"] },
            { model: db.Tamanho, as: "tamanho", attributes: ["id", "nome"] },
            { model: db.Borda, as: "borda", attributes: ["id", "nome"] },
          ],
        },
        { model: db.Pizzaria, as: "pizzaria", attributes: ["id", "nome"] },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  async listaPedidosPizzaria(pizzaria_id: string) {
    return db.Order.findAll({
      where: { pizzaria_id },
      include: [
        {
          model: db.OrderItem,
          as: "itens",
          include: [
            { model: db.Produto, as: "produto", attributes: ["id", "nome"] },
            { model: db.Produto, as: "produtoSegundoSabor", attributes: ["id", "nome"] },
            { model: db.Tamanho, as: "tamanho", attributes: ["id", "nome"] },
            { model: db.Borda, as: "borda", attributes: ["id", "nome"] },
          ],
        },
        { model: db.User, as: "cliente", attributes: ["id", "nome", "telefone"] },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  async updateStatus(orderId: string, novoStatus: OrderStatus) {
    const order = await db.Order.findByPk(orderId);
    if (!order) throw new Error("Pedido não encontrado");
    order.status = novoStatus;
    await order.save();
    return order;
  }

  async marcarComoImpresso(orderId: string) {
    const order = await db.Order.findByPk(orderId);
    if (!order) throw new Error("Pedido não encontrado");
    order.impresso_em = new Date();
    await order.save();
    return order;
  }
}

export default new OrderServices();