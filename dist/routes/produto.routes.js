"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProdutoController_1 = __importDefault(require("../controllers/ProdutoController"));
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const upload_1 = require("../middlewares/upload");
const router = (0, express_1.Router)();
router.get('/', checkAuth_1.default, ProdutoController_1.default.getProduto);
router.post('/', checkAuth_1.default, ProdutoController_1.default.createProduto);
router.patch('/:id', checkAuth_1.default, ProdutoController_1.default.updateProduto);
router.patch('/:id/status', checkAuth_1.default, ProdutoController_1.default.updateStatusProduto);
router.patch('/:id/imagem', checkAuth_1.default, upload_1.upload.single('imagem'), ProdutoController_1.default.uploadImagem);
router.delete('/:id', checkAuth_1.default, ProdutoController_1.default.deleteProduto);
exports.default = router;
