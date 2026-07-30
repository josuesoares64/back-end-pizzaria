"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const checkPizzariaVinculo_1 = __importDefault(require("../middlewares/checkPizzariaVinculo"));
const OrderController_1 = __importDefault(require("../controllers/OrderController"));
const router = (0, express_1.Router)();
router.post('/', checkAuth_1.default, OrderController_1.default.createOrder);
router.get('/me', checkAuth_1.default, OrderController_1.default.getPedidosCliente);
router.get('/', checkAuth_1.default, checkPizzariaVinculo_1.default, OrderController_1.default.getPedidosPizzaria);
router.patch('/:id/status', checkAuth_1.default, checkPizzariaVinculo_1.default, OrderController_1.default.updateStatus);
exports.default = router;
