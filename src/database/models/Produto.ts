import { DataTypes, Model, Sequelize } from "sequelize";

export type TipoProduto = 'simples' | 'pizza';

interface ProdutoAttributes {
    id?: string;
    nome: string;
    descricao?: string;
    preco?: number;
    tipo?: TipoProduto;
    categoria_id: string;
    imagem_url?: string;
    disponivel?: boolean;
}

class Produto extends Model<ProdutoAttributes> {
    declare id: string;
    declare nome: string;
    declare descricao?: string;
    declare preco?: number;
    declare tipo: TipoProduto;
    declare categoria_id: string;
    declare imagem_url?: string;
    declare disponivel?: boolean;

    static initModel = (sequelize: Sequelize): typeof Produto => {
        Produto.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                nome: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                descricao: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                preco: {
                    type: DataTypes.DECIMAL,
                    allowNull: true
                },
                tipo: {
                    type: DataTypes.ENUM('simples', 'pizza'),
                    allowNull: false,
                    defaultValue: 'simples'
                },
                categoria_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'categorias',
                        key: 'id'
                    }
                },
                imagem_url: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                disponivel: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true
                }
            },
            {
                sequelize,
                modelName: 'Produto',
                tableName: 'produtos',
                underscored: true,
                validate: {
                    precoObrigatorioParaSimples() {
                        if (this.tipo === 'simples' && (this.preco === null || this.preco === undefined)) {
                            throw new Error('Produto do tipo "simples" exige preço.');
                        }
                    }
                }
            }
        );
        return Produto
    }
}

export default Produto;