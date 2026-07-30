"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoriaController_1 = __importDefault(require("../controllers/CategoriaController"));
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const router = (0, express_1.Router)();
router.get('/', checkAuth_1.default, CategoriaController_1.default.getCategoria);
router.post('/', checkAuth_1.default, CategoriaController_1.default.createCategoria);
router.patch('/:id', checkAuth_1.default, CategoriaController_1.default.updateCategoria);
router.patch('/:id/status', checkAuth_1.default, CategoriaController_1.default.updateCategoriaStatus);
exports.default = router;
