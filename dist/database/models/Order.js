"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Order extends sequelize_1.Model {
}
Order.initModel = (sequelize) => {
    Order.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
        },
        pizzaria_id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM("pendente", "confirmado", "preparando", "saiu_para_entrega", "entregue", "cancelado"),
            allowNull: false,
            defaultValue: "pendente",
        },
        total: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        forma_pagamento: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        observacoes: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        endereco_cep: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        endereco_rua: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        endereco_numero: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        endereco_bairro: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        endereco_complemento: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        endereco_referencia: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "Order",
        tableName: "orders",
        underscored: true,
    });
    return Order;
};
exports.default = Order;
