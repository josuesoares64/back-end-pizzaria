"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../database/models"));
const OrderService_1 = __importDefault(require("../services/OrderService"));
class OrderController {
    async createOrder(req, res) {
        try {
            const order = await OrderService_1.default.createOrder({
                ...req.body,
                user_id: req.userId,
            });
            res.status(201).json(order);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getPedidosCliente(req, res) {
        try {
            const pedidos = await OrderService_1.default.listaPedidosCliente(req.userId);
            res.status(200).json(pedidos);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getPedidosPizzaria(req, res) {
        try {
            const pedidos = await OrderService_1.default.listaPedidosPizzaria(req.pizzariaId);
            res.status(200).json(pedidos);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updateStatus(req, res) {
        try {
            const id = req.params.id;
            const status = req.body.status;
            const order = await models_1.default.Order.findByPk(id);
            if (!order) {
                return res.status(404).json({ error: "Pedido não encontrado" });
            }
            if (order.pizzaria_id !== req.pizzariaId) {
                return res.status(403).json({ error: "Pedido não pertence à sua pizzaria" });
            }
            const pedidoAtualizado = await OrderService_1.default.updateStatus(id, status);
            res.status(200).json(pedidoAtualizado);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.default = new OrderController();
