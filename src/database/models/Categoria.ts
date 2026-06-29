import { DataTypes, Model, Sequelize } from "sequelize";

interface CategoriaAttributes {
    id?: string;
    nome: string;
    pizzaria_id: string;
    ativo: boolean;
}

class Categoria extends Model<CategoriaAttributes> {
    declare id: string;
    declare nome: string;
    declare pizzaria_id: string;
    declare ativo: boolean;

    static initModel = (sequelize: Sequelize): typeof Categoria => {
        Categoria.init(
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
                ativo: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true
                }
            },
            {
                sequelize,
                modelName: 'Categoria',
                tableName: 'categorias',
                underscored: true,
            }
        );
        return Categoria
    }
}

export default Categoria;