"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const jsonSecret_1 = __importDefault(require("../config/jsonSecret"));
const autenticado = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'Token não informado' });
    }
    const [scheme, accessToken] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !accessToken) {
        return res.status(401).send({ message: `Formato inválido. Use: Bearer <token>` });
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(accessToken, jsonSecret_1.default.secret);
        req.userId = decoded.id;
        req.userEmail = decoded.email;
        req.userRole = decoded.role;
        return next();
    }
    catch (error) {
        return res.status(401).send({ message: 'Token inválido ou expirado' });
    }
};
exports.default = autenticado;
