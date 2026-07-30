"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const produtoPrecoController_1 = __importDefault(require("../controllers/produtoPrecoController"));
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const router = (0, express_1.Router)();
router.post('/:produtoId/tamanhos', checkAuth_1.default, produtoPrecoController_1.default.vincularTamanhos);
router.delete('/:produtoId/tamanhos/:tamanhoId', checkAuth_1.default, produtoPrecoController_1.default.desvincularTamanho);
router.get('/:produtoId/precos', checkAuth_1.default, produtoPrecoController_1.default.listarPrecos);
router.put('/:produtoId/precos', checkAuth_1.default, produtoPrecoController_1.default.atualizarPrecos);
exports.default = router;
