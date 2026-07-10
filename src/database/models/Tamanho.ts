import { DataTypes, Model, Sequelize } from "sequelize";

interface TamanhoAttributes {
    id?: string;
    nome: string;
    pizzaria_id: string;
    ordem?: number;
}

class Tamanho extends Model<TamanhoAttributes> {
    declare id: string;
    declare nome: string;
    declare pizzaria_id: string;
    declare ordem?: number;

    static initModel = (sequelize: Sequelize): typeof Tamanho => {
        Tamanho.init(
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
                pizzaria_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'pizzarias',
                        key: 'id'
                    }
                },
                ordem: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    defaultValue: 0
                }
            },
            {
                sequelize,
                modelName: 'Tamanho',
                tableName: 'tamanhos',
                underscored: true,
            }
        );
        return Tamanho
    }
}

export default Tamanho;