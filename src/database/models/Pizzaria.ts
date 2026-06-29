import { DataTypes, Model, Sequelize } from "sequelize";

interface PizzariaAttributes {
    id?: string;
    nome: string;
    slug: string;
    plano: string;
    telefone?: string;
    endereco?: string;
    logo_url?: string;
    bloqueado?: boolean;
}

class Pizzaria extends Model<PizzariaAttributes> {
    declare id: string;
    declare nome: string;
    declare slug: string;
    declare plano: string;
    declare telefone?: string;
    declare endereco?: string;
    declare logo_url?: string;
    declare bloqueado: boolean;

    static initModel = (sequelize: Sequelize): typeof Pizzaria => {
        Pizzaria.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                nome: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                slug: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                plano: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: 'trial',
                },
                telefone: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                endereco: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                logo_url: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                bloqueado: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                }
            },
            {
                sequelize,
                modelName: "Pizzaria",
                tableName: "pizzarias",
                underscored: true,
            }
        );
        return Pizzaria;
    }
}

export default Pizzaria;