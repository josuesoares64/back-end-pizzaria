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
        pizzaria_id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'pizzarias',
                key: 'id'
            }
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
            allowNull: false
        },
        categoria: {
            type: sequelize_1.DataTypes.ENUM('pizza', 'esfiha', 'bebida', 'sobremesa'),
            allowNull: false,
        },
        imagem_url: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        disponivel: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: 'Produto',
        tableName: 'produtos',
        underscored: true,
    });
    return Produto;
};
exports.default = Produto;
