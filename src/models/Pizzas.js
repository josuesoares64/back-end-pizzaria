const { DataTypes } =  require('sequelize');
const sequelize = require('../config/database')

const Pizza = sequelize.define("Pizza", {
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
    preco_pequena: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    preco_media: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    preco_grande: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    preco_familia: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
});

module.exports = Pizza;