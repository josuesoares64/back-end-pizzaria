import { DataTypes, Model, Sequelize } from "sequelize";

interface OrderAttributes {
    id?: string;
    pizzaria_id: string;
    user_id: string;
    status: string;
    total: number;
    observacao?: string;
    endereco_entrega?: string;
}

class Order extends Model<OrderAttributes> {
    declare id: string;
    declare pizzaria_id: string;
    declare user_id: string;
    declare status: string;
    declare total: number;
    declare observacao?: string;
    declare endereco_entrega?: string;

    static initModel = (sequelize: Sequelize): typeof Order => {
        Order.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                pizzaria_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'pizzarias',
                        key: 'id'
                    }
                },
                user_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id'
                    }
                },
                status: {
                    type: DataTypes.ENUM('pendente', 'confirmado', 'em_preparo', 'entregue', 'cancelado'),
                    allowNull: false,
                    defaultValue: 'pendente'
                },
                total: {
                    type: DataTypes.DECIMAL,
                    allowNull: false
                },
                observacao: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                endereco_entrega: {
                    type: DataTypes.STRING,
                    allowNull: true
                }
            },
            {
                sequelize,
                modelName: 'Order',
                tableName: 'orders',
                underscored: true,
            }
        );
        return Order
    }
}

export default Order;