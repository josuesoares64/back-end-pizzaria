import { DataTypes, Model, Sequelize } from "sequelize";
import Pizzaria from "./Pizzaria";

interface PizzariaUserAttributes {
    id?: string;
    pizzaria_id: string;
    user_id: string;
    role: string;
}

class PizzariaUser extends Model<PizzariaUserAttributes> {
    declare id: string;
    declare pizzaria_id: string;
    declare user_id: string;
    declare role: string;
    declare pizzaria?: Pizzaria;

    static initModel = (sequelize: Sequelize): typeof PizzariaUser => {
        PizzariaUser.init(
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
                        key: 'id',
                    },
                },
                user_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                },
                role: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'PizzariaUser',
                tableName: 'pizzaria_users',
                underscored: true,
            }
        );
        return PizzariaUser;
    }
}

export default PizzariaUser;