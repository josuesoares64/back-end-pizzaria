"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Endereco extends sequelize_1.Model {
}
Endereco.initModel = (sequelize) => {
    Endereco.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
        },
        cep: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        rua: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        numero: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        bairro: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        complemento: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        referencia: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "Endereco",
        tableName: "enderecos",
        underscored: true,
    });
    return Endereco;
};
exports.default = Endereco;
