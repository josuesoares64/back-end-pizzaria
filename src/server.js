const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("./models");
const pizzaRoutes = require("./routes/pizzaRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/pizzas", pizzaRoutes);

// conexão com o banco
connectDatabase();

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
