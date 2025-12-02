const sequelize = require("../config/database");

async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log("✔ Conectado ao MySQL com sucesso!");
    
    await sequelize.sync(); // <-- cria as tabelas automaticamente
    console.log("✔ Tabelas sincronizadas!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MySQL:", error);
  }
}

module.exports = { sequelize, connectDatabase };
