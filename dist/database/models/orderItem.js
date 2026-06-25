"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class OrderItem extends sequelize_1.Model {
}
OrderItem.initModel = (sequelize) => {
    OrderItem.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        order_id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'orders',
                key: 'id'
            }
        },
        produto_id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'produtos',
                key: 'id'
            }
        },
        quantidade: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        preco_unit: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'OrderItem',
        tableName: 'order_items',
        underscored: true,
    });
    return OrderItem;
};
exports.default = OrderItem;
