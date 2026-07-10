import { DataTypes, Model, Sequelize } from "sequelize";

interface ProdutoPrecoAttributes {
    id?: string;
    produto_id: string;
    tamanho_id: string;
    preco: number;
}

class ProdutoPreco extends Model<ProdutoPrecoAttributes> {
    declare id: string;
    declare produto_id: string;
    declare tamanho_id: string;
    declare preco: number;

    static initModel = (sequelize: Sequelize): typeof ProdutoPreco => {
        ProdutoPreco.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                produto_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'produtos',
                        key: 'id'
                    }
                },
                tamanho_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'tamanhos',
                        key: 'id'
                    }
                },
                preco: {
                    type: DataTypes.DECIMAL,
                    allowNull: false,
                }
            },
            {
                sequelize,
                modelName: 'ProdutoPreco',
                tableName: 'produto_precos',
                underscored: true,
                indexes: [
                    {
                        unique: true,
                        fields: ['produto_id', 'tamanho_id']
                    }
                ]
            }
        );
        return ProdutoPreco
    }
}

export default ProdutoPreco;