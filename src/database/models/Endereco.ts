import { DataTypes, Model, Sequelize } from "sequelize";

interface EnderecoAttributes {
    id?: string;
    user_id: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    principal: boolean;
}

class Endereco extends Model<EnderecoAttributes> {
    declare id: string;
    declare user_id: string;
    declare rua: string;
    declare numero: string;
    declare bairro: string;
    declare cidade: string;
    declare estado: string;
    declare cep: string;
    declare principal: boolean;

    static initModel = (sequelize: Sequelize): typeof Endereco => {
        Endereco.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                user_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id'
                    }
                },
                rua: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                numero: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                bairro: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                cidade: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                estado: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                cep: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                principal: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                }
            },
            {
                sequelize,
                modelName: 'Endereco',
                tableName: 'enderecos',
                underscored: true
            }
        );
        return Endereco
    }
}

export default Endereco;