const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const sequelize = require('./config/database'); 
const path = require('path'); // <-- necessário

const app = express();

app.use(express.json()); 
app.use(cors()); 

// <-- ADICIONE ESTA LINHA
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// sincroniza banco
sequelize.sync()
  .then(() => console.log("Banco sincronizado!"))
  .catch((err) => console.error("Erro ao sincronizar o banco:", err));

routes(app);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

module.exports = app;
