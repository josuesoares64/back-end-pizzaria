"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file !== path.basename(__filename) &&
      file.endsWith(".js") &&
      !file.includes(".test")
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

sequelize
  .authenticate()
  .then(() => console.log("Banco conectado com sucesso"))
  .catch((err) => console.error("Erro ao conectar ao banco", err));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
