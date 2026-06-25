"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const router = (0, express_1.Router)();
const authController = new AuthController_1.default();
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/register-owner", authController.registerOwner);
exports.default = router;
