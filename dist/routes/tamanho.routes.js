"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TamanhoController_1 = __importDefault(require("../controllers/TamanhoController"));
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const router = (0, express_1.Router)();
router.get('/', checkAuth_1.default, TamanhoController_1.default.getTamanho);
router.post('/', checkAuth_1.default, TamanhoController_1.default.createTamanho);
router.patch("/:id", checkAuth_1.default, TamanhoController_1.default.reorganizarOrdem);
router.patch("/:id/nome", checkAuth_1.default, TamanhoController_1.default.upadateTamanho);
router.delete("/:id", checkAuth_1.default, TamanhoController_1.default.deleteTamanho);
exports.default = router;
