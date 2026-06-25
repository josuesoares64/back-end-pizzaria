"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../database/models"));
class PizzariaService {
    async getMe(userId) {
        const vinculo = await models_1.default.PizzariaUser.findOne({
            where: { user_id: userId },
            include: [{ model: models_1.default.Pizzaria, as: 'pizzaria' }]
        });
        if (!vinculo)
            throw new Error("Pizzaria não encontrada para este usuário");
        return vinculo.pizzaria;
    }
}
