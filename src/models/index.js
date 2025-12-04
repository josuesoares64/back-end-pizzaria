const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// importa corretamente (sem {})
const sequelize = require('../config/database.js');

const db = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file !== path.basename(__filename) &&
      file.endsWith('.js') &&
      !file.includes('.test')
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
