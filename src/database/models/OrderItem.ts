import { DataTypes, Model, Sequelize } from "sequelize";

interface OrderItemAttributes {
    id?: string;
    order_id: string;
    produto_id: string;
    quantidade: number;
    preco_unit: number;
}

class OrderItem extends Model<OrderItemAttributes> {
    declare id: string;
    declare order_id: string;
    declare produto_id: string;
    declare quantidade: number;
    declare preco_unit: number;

    static initModel = (sequelize: Sequelize): typeof OrderItem => {
        OrderItem.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                order_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'orders',
                        key: 'id'
                    }
                },
                produto_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'produtos',
                        key: 'id'
                    }
                },
                quantidade: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                preco_unit: {
                    type: DataTypes.DECIMAL,
                    allowNull: false
                }
            },
            {
                sequelize,
                modelName: 'OrderItem',
                tableName: 'order_items',
                underscored: true,
            }
        );
        return OrderItem
    }
}

export default OrderItem;