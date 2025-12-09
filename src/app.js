const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/database'); // <-- IMPORTANTE

const app = express();

app.use(express.json()); // caso não tenha

// Sincroniza todas as tabelas do Sequelize
sequelize.sync()
  .then(() => console.log("Banco sincronizado!"))
  .catch((err) => console.error("Erro ao sincronizar o banco:", err));

routes(app);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

module.exports = app;
