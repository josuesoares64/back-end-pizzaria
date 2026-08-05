import { Router } from "express";
import autenticado from "../middlewares/checkAuth";
import checkPizzariaVinculo from "../middlewares/checkPizzariaVinculo";
import OrderController from "../controllers/OrderController";

const router = Router();

router.post('/', autenticado, OrderController.createOrder)
router.get('/me', autenticado, OrderController.getPedidosCliente)
router.get('/', autenticado, checkPizzariaVinculo, OrderController.getPedidosPizzaria)
router.patch('/:id/status', autenticado, checkPizzariaVinculo, OrderController.updateStatus)
router.patch('/:id/imprimir', autenticado, checkPizzariaVinculo, OrderController.imprimirPedido)

export default router;