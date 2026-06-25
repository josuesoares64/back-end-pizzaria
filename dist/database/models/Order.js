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
        pizzaria_id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'pizzarias',
                key: 'id'
            }
        },
        user_id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('pendente', 'confirmado', 'em_preparo', 'entregue', 'cancelado'),
            allowNull: false,
            defaultValue: 'pendente'
        },
        total: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false
        },
        observacao: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        endereco_entrega: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Order',
        tableName: 'orders',
        underscored: true,
    });
    return Order;
};
exports.default = Order;
