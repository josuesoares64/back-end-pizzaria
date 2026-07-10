import { DataTypes, Model, Sequelize } from "sequelize";

interface BordaAttributes {
    id?: string;
    nome: string;
    preco: number;
    pizzaria_id: string;
    ativo?: boolean;
}

class Borda extends Model<BordaAttributes> {
    declare id: string;
    declare nome: string;
    declare preco: number;
    declare pizzaria_id: string;
    declare ativo?: boolean;

    static initModel = (sequelize: Sequelize): typeof Borda => {
        Borda.init(
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
                preco: {
                    type: DataTypes.DECIMAL,
                    allowNull: false,
                },
                pizzaria_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'pizzarias',
                        key: 'id'
                    }
                },
                ativo: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true
                }
            },
            {
                sequelize,
                modelName: 'Borda',
                tableName: 'bordas',
                underscored: true,
            }
        );
        return Borda
    }
}

export default Borda;