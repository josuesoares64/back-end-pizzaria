"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PizzariaController_1 = __importDefault(require("../controllers/PizzariaController"));
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const upload_1 = require("../middlewares/upload");
const router = (0, express_1.Router)();
router.get("/", PizzariaController_1.default.listaPizzarias);
router.get("/me", checkAuth_1.default, PizzariaController_1.default.getMe);
router.get("/:slug", PizzariaController_1.default.getSlug);
router.patch("/me", checkAuth_1.default, PizzariaController_1.default.editarPizzaria);
router.patch("/me/logo", checkAuth_1.default, upload_1.upload.single('logo'), PizzariaController_1.default.uploadLogo);
exports.default = router;
