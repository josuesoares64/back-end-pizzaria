"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enderecoService_1 = __importDefault(require("../services/enderecoService"));
class EnderecoController {
    async getEndereco(req, res) {
        try {
            const endereco = await enderecoService_1.default.getEndereco(req.userId);
            if (!endereco)
                return res.status(404).json({ message: "Endereço não cadastrado" });
            return res.status(200).json(endereco);
        }
        catch (error) {
            return res.status(500).json({ message: "Erro ao buscar endereço" });
        }
    }
    async upsertEndereco(req, res) {
        try {
            const endereco = await enderecoService_1.default.upsertEndereco(req.userId, req.body);
            return res.status(200).json(endereco);
        }
        catch (error) {
            return res.status(500).json({ message: "Erro ao salvar endereço" });
        }
    }
}
exports.default = new EnderecoController();
