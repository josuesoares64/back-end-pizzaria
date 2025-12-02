const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

// conexão com o banco
connectDatabase();

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
