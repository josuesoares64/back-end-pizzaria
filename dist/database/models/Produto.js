"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Produto extends sequelize_1.Model {
}
Produto.initModel = (sequelize) => {
    Produto.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        preco: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: true
        },
        tipo: {
            type: sequelize_1.DataTypes.ENUM('simples', 'pizza'),
            allowNull: false,
            defaultValue: 'simples'
        },
        categoria_id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'categorias',
                key: 'id'
            }
        },
        imagem_url: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        disponivel: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        },
        excluido: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
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
    });
    return Produto;
};
exports.default = Produto;
