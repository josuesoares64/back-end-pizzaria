"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Tamanho extends sequelize_1.Model {
}
Tamanho.initModel = (sequelize) => {
    Tamanho.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        pizzaria_id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'pizzarias',
                key: 'id'
            }
        },
        ordem: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'Tamanho',
        tableName: 'tamanhos',
        underscored: true,
    });
    return Tamanho;
};
exports.default = Tamanho;
