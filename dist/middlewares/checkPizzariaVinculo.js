"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkPizzariaVinculo;
const models_1 = __importDefault(require("../database/models"));
async function checkPizzariaVinculo(req, res, next) {
    try {
        const vinculo = await models_1.default.PizzariaUser.findOne({
            where: { user_id: req.userId },
        });
        if (!vinculo) {
            return res.status(403).json({ error: "Usuário não tem acesso a nenhuma pizzaria" });
        }
        req.pizzariaId = vinculo.pizzaria_id;
        next();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
