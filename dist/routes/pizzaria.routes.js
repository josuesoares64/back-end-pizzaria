"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PizzariaController_1 = __importDefault(require("../controllers/PizzariaController"));
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const router = (0, express_1.Router)();
router.get("/me", checkAuth_1.default, PizzariaController_1.default.getMe);
exports.default = router;
