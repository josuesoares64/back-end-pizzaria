"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Borda extends sequelize_1.Model {
}
Borda.initModel = (sequelize) => {
    Borda.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        preco: {
            type: sequelize_1.DataTypes.DECIMAL,
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
        modelName: 'Borda',
        tableName: 'bordas',
        underscored: true,
    });
    return Borda;
};
exports.default = Borda;
