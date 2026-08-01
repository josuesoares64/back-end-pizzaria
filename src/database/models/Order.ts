import { DataTypes, Model, Sequelize } from "sequelize";

export type OrderStatus =
    | "pendente"
    | "confirmado"
    | "preparando"
    | "saiu_para_entrega"
    | "entregue"
    | "cancelado";

interface OrderAttributes {
    id?: string;
    user_id: string;
    pizzaria_id: string;
    status?: OrderStatus;
    total: number;
    forma_pagamento: string;
    troco_para?: number;
    observacoes?: string;
    endereco_cep: string;
    endereco_rua: string;
    endereco_numero: string;
    endereco_bairro: string;
    endereco_complemento?: string;
    endereco_referencia?: string;
}

class Order extends Model<OrderAttributes> {
    declare id: string;
    declare user_id: string;
    declare pizzaria_id: string;
    declare status: OrderStatus;
    declare total: number;
    declare forma_pagamento: string;
    declare troco_para?: number;
    declare observacoes?: string;
    declare endereco_cep: string;
    declare endereco_rua: string;
    declare endereco_numero: string;
    declare endereco_bairro: string;
    declare endereco_complemento?: string;
    declare endereco_referencia?: string;

    static initModel = (sequelize: Sequelize): typeof Order => {
        Order.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                user_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                pizzaria_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.ENUM(
                        "pendente",
                        "confirmado",
                        "preparando",
                        "saiu_para_entrega",
                        "entregue",
                        "cancelado"
                    ),
                    allowNull: false,
                    defaultValue: "pendente",
                },
                total: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
                forma_pagamento: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                troco_para: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: true,
                },
                observacoes: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                endereco_cep: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                endereco_rua: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                endereco_numero: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                endereco_bairro: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                endereco_complemento: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                endereco_referencia: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: "Order",
                tableName: "orders",
                underscored: true,
            }
        );
        return Order;
    }
}

export default Order;