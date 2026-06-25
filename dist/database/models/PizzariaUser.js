"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class PizzariaUser extends sequelize_1.Model {
}
PizzariaUser.initModel = (sequelize) => {
    PizzariaUser.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        pizzaria_id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'pizzarias',
                key: 'id',
            },
        },
        user_id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        role: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'PizzariaUser',
        tableName: 'pizzaria_users',
        underscored: true,
    });
    return PizzariaUser;
};
exports.default = PizzariaUser;
