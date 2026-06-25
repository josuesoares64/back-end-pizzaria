"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// config/jsonSecret.ts
require("dotenv/config");
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET não definido no .env');
}
const jsonSecret = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};
exports.default = jsonSecret;
