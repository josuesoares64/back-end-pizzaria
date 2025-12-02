const {DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Bebida = sequelize.define("Bebida", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
});

module.exports = Bebida;