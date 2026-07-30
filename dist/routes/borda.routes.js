"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const BordaController_1 = __importDefault(require("../controllers/BordaController"));
const router = (0, express_1.Router)();
router.get('/', checkAuth_1.default, BordaController_1.default.getBorda);
router.post('/', checkAuth_1.default, BordaController_1.default.createBorda);
router.patch('/:id', checkAuth_1.default, BordaController_1.default.updateBorda);
router.patch('/:id/status', checkAuth_1.default, BordaController_1.default.toggleStatusBorda);
router.delete('/:id', checkAuth_1.default, BordaController_1.default.deleteBorda);
exports.default = router;
