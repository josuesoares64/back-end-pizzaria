"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class ProdutoPreco extends sequelize_1.Model {
}
ProdutoPreco.initModel = (sequelize) => {
    ProdutoPreco.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        produto_id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'produtos',
                key: 'id'
            }
        },
        tamanho_id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'tamanhos',
                key: 'id'
            }
        },
        preco: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: true,
        }
    }, {
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
    });
    return ProdutoPreco;
};
exports.default = ProdutoPreco;
