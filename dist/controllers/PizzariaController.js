"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PizzariasService_1 = __importDefault(require("../services/PizzariasService"));
class PizzariaController {
    constructor() {
        this.getMe = async (req, res) => {
            try {
                if (!req.userId) {
                    return res.status(401).json({ error: "Não autenticado" });
                }
                const pizzaria = await PizzariasService_1.default.getMe(req.userId);
                return res.status(200).json(pizzaria);
            }
            catch (error) {
                console.log("Erro ao buscar pizzaria:", error);
                return res.status(404).json({
                    error: "Erro ao buscar pizzaria",
                    detalhes: error instanceof Error ? error.message : "Error desconhecido",
                });
            }
        };
    }
}
exports.default = new PizzariaController;
