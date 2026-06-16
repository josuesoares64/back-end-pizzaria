import { DataTypes, Model, Sequelize } from "sequelize";

interface UserAttributes {
    id?: string;
    nome: string;
    email: string;
    senha_hash: string;
    role: string;
    telefone?: string;
}

class User extends Model<UserAttributes> {
    declare id: string;
    declare nome: string;
    declare email: string;
    declare senha_hash: string;
    declare role: string;
    declare telefone?: string;

    static initModel = (sequelize: Sequelize): typeof User => {
        User.init(
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
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                senha_hash: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                role: {
                    type: DataTypes.STRING,
                    defaultValue: 'cliente'
                },
                telefone: {
                    type: DataTypes.STRING,
                    allowNull: true
                }
            },
            {
                sequelize,
                modelName: 'User',
                tableName: 'users',
                underscored: true,
            }
        );
        return User
    }
}

export default User;