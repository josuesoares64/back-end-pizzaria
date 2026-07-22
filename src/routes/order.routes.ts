import { Router } from "express";
import autenticado from "../middlewares/checkAuth";
import OrderController from "../controllers/OrderController";

const router = Router();

router.post('/', autenticado, OrderController.createOrder)
router.get('/me', autenticado, OrderController.getPedidosCliente)
router.get('/', autenticado, OrderController.getPedidosPizzaria)
router.patch('/:id/status', autenticado, OrderController.updateStatus)

export default router;