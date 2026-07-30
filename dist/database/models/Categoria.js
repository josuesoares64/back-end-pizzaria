"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Categoria extends sequelize_1.Model {
}
Categoria.initModel = (sequelize) => {
    Categoria.init({
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
        ativo: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: 'Categoria',
        tableName: 'categorias',
        underscored: true,
    });
    return Categoria;
};
exports.default = Categoria;
