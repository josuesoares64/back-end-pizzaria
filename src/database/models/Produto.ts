import { DataTypes, Model, Sequelize } from "sequelize";

interface ProdutoAttributes {
    id?: string;
    pizzaria_id: string;
    nome: string;
    descricao?: string;
    preco: number;
    categoria: string;
    imagem_url?: string;
    disponivel: boolean;
}

class Produto extends Model<ProdutoAttributes> {
    declare id: string;
    declare pizzaria_id: string;
    declare nome: string;
    declare descricao?: string;
    declare preco: number;
    declare categoria: string;
    declare imagem_url?: string;
    declare disponivel: boolean;

    static initModel = (sequelize: Sequelize): typeof Produto => {
        Produto.init(
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
                        key: 'id'
                    }
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
                    allowNull: false
                },
                categoria: {
                    type: DataTypes.ENUM('pizza', 'esfiha', 'bebida', 'sobremesa'),
                    allowNull: false,
                    
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
            }
        );
        return Produto
    }
}

export default Produto;