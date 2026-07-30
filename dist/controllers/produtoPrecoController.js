"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const produtoPrecoService_1 = __importDefault(require("../services/produtoPrecoService"));
const models_1 = __importDefault(require("../database/models"));
const sequelize_1 = require("sequelize");
const getPizzariaIdComAcesso = async (userId, roles, res) => {
    const vinculo = await models_1.default.PizzariaUser.findOne({
        where: { user_id: userId, role: { [sequelize_1.Op.in]: roles } }
    });
    if (!vinculo) {
        res.status(403).json({ error: 'Usuário não tem acesso a esse recurso.' });
        return null;
    }
    return vinculo.pizzaria_id;
};
const vincularTamanhos = async (req, res) => {
    try {
        const { produtoId } = req.params;
        const { tamanho_ids } = req.body;
        if (!Array.isArray(tamanho_ids) || tamanho_ids.length === 0) {
            return res.status(400).json({ error: 'tamanho_ids deve ser uma lista não vazia.' });
        }
        const pizzariaId = await getPizzariaIdComAcesso(req.userId, ['dono'], res);
        if (!pizzariaId)
            return;
        const resultado = await produtoPrecoService_1.default.vincularTamanhos(produtoId, tamanho_ids, pizzariaId);
        return res.status(201).json(resultado);
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
const desvincularTamanho = async (req, res) => {
    try {
        const { produtoId, tamanhoId } = req.params;
        const pizzariaId = await getPizzariaIdComAcesso(req.userId, ['dono'], res);
        if (!pizzariaId)
            return;
        await produtoPrecoService_1.default.desvincularTamanho(produtoId, tamanhoId, pizzariaId);
        return res.status(204).send();
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
const listarPrecos = async (req, res) => {
    try {
        const { produtoId } = req.params;
        const pizzariaId = await getPizzariaIdComAcesso(req.userId, ['dono', 'funcionario'], res);
        if (!pizzariaId)
            return;
        const resultado = await produtoPrecoService_1.default.listarPrecos(produtoId, pizzariaId);
        return res.status(200).json(resultado);
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
const atualizarPrecos = async (req, res) => {
    try {
        const { produtoId } = req.params;
        const { precos } = req.body;
        if (!Array.isArray(precos) || precos.length === 0) {
            return res.status(400).json({ error: 'precos deve ser uma lista não vazia.' });
        }
        const pizzariaId = await getPizzariaIdComAcesso(req.userId, ['dono'], res);
        if (!pizzariaId)
            return;
        const resultado = await produtoPrecoService_1.default.atualizarPrecos(produtoId, precos, pizzariaId);
        return res.status(200).json(resultado);
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
exports.default = {
    vincularTamanhos,
    desvincularTamanho,
    listarPrecos,
    atualizarPrecos
};
