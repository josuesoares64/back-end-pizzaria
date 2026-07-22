import { DataTypes, Model, Sequelize } from "sequelize";

interface OrderItemAttributes {
    id?: string;
    order_id: string;
    produto_id: string;
    produto_id_2?: string;
    tamanho_id?: string;
    borda_id?: string;
    quantidade: number;
    preco_unitario: number;
    subtotal: number;
    observacoes?: string;
}

class OrderItem extends Model<OrderItemAttributes> {
    declare id: string;
    declare order_id: string;
    declare produto_id: string;
    declare produto_id_2?: string;
    declare tamanho_id?: string;
    declare borda_id?: string;
    declare quantidade: number;
    declare preco_unitario: number;
    declare subtotal: number;
    declare observacoes?: string;

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
                },
                produto_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                produto_id_2: {
                    type: DataTypes.UUID,
                    allowNull: true,
                },
                tamanho_id: {
                    type: DataTypes.UUID,
                    allowNull: true,
                },
                borda_id: {
                    type: DataTypes.UUID,
                    allowNull: true,
                },
                quantidade: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                preco_unitario: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
                subtotal: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
                observacoes: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: "OrderItem",
                tableName: "order_items",
                underscored: true,
            }
        );
        return OrderItem;
    }
}

export default OrderItem;