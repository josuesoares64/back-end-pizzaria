const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const sequelize = require('./config/database'); 

const app = express();

app.use(express.json()); 

// Configuração CORS essencial para permitir requisições de outras origens (como um arquivo HTML local)
app.use(cors()); 

sequelize.sync()
  .then(() => console.log("Banco sincronizado!"))
  .catch((err) => console.error("Erro ao sincronizar o banco:", err));

routes(app);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

module.exports = app;