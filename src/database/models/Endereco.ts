import { DataTypes, Model, Sequelize } from "sequelize";

interface EnderecoAttributes {
    id?: string;
    user_id: string;
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    complemento?: string;
    referencia?: string;
}

class Endereco extends Model<EnderecoAttributes> {
    declare id: string;
    declare user_id: string;
    declare cep: string;
    declare rua: string;
    declare numero: string;
    declare bairro: string;
    declare complemento?: string;
    declare referencia?: string;

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
                },
                cep: {
                    type: DataTypes.STRING,
                    allowNull: false,
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
                complemento: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                referencia: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: "Endereco",
                tableName: "enderecos",
                underscored: true,
            }
        );
        return Endereco;
    };
}

export default Endereco;