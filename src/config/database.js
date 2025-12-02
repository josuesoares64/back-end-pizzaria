const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,  // pizzaria_db
  process.env.DB_USER,  // root
  process.env.DB_PASS,  // Mysql102030
  {
    host: process.env.DB_HOST,  // localhost
    dialect: process.env.DB_DIALECT, // mysql
    logging: false,
  }
);

module.exports = sequelize;
