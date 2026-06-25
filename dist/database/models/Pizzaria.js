"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Pizzaria extends sequelize_1.Model {
}
Pizzaria.initModel = (sequelize) => {
    Pizzaria.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        plano: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: 'trial',
        },
        telefone: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        endereco: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        logo_url: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "Pizzaria",
        tableName: "pizzarias",
        underscored: true,
    });
    return Pizzaria;
};
exports.default = Pizzaria;
