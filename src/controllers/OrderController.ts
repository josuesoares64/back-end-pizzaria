import { Request, Response } from 'express';
import db from '../database/models';
import OrderServices from '../services/OrderService';
import { OrderStatus } from '../database/models/Order';

class OrderController {

    async createOrder(req: Request, res: Response) {
        try {
            const order = await OrderServices.createOrder({
                ...req.body,
                user_id: req.userId,
            });
            res.status(201).json(order);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async getPedidosCliente(req: Request, res: Response) {
        try {
            const pedidos = await OrderServices.listaPedidosCliente(req.userId as string);
            res.status(200).json(pedidos);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async getPedidosPizzaria(req: Request, res: Response) {
        try {
            const vinculo = await db.PizzariaUser.findOne({
                where: { user_id: req.userId }
            });

            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não tem acesso a nenhuma pizzaria" });
            }

            const pedidos = await OrderServices.listaPedidosPizzaria(vinculo.pizzaria_id);
            res.status(200).json(pedidos);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async updateStatus(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const status = req.body.status as OrderStatus;
            const order = await OrderServices.updateStatus(id, status);
            res.status(200).json(order);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }
}

export default new OrderController();