"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EnderecoController_1 = __importDefault(require("../controllers/EnderecoController"));
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const router = (0, express_1.Router)();
router.get("/me", checkAuth_1.default, EnderecoController_1.default.getEndereco);
router.put("/me", checkAuth_1.default, EnderecoController_1.default.upsertEndereco);
exports.default = router;
