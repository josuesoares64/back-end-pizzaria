"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../database/models"));
class EnderecoService {
    async getEndereco(userId) {
        return models_1.default.Endereco.findOne({ where: { user_id: userId } });
    }
    async upsertEndereco(userId, dto) {
        const existente = await models_1.default.Endereco.findOne({ where: { user_id: userId } });
        if (existente) {
            await existente.update(dto);
            return existente;
        }
        return models_1.default.Endereco.create({ ...dto, user_id: userId });
    }
}
exports.default = new EnderecoService();
