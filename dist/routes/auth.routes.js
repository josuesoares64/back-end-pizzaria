"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const router = (0, express_1.Router)();
const authController = new AuthController_1.default();
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/register-owner", authController.registerOwner);
router.post("/register-funcionario", checkAuth_1.default, authController.registerFuncionario);
router.get("/funcionarios", checkAuth_1.default, authController.listarFuncionarios);
exports.default = router;
