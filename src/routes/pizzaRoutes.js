const express = require("express");
const router = express.Router();

const criarUpload = require('../middlewares/upload');
const PizzaController = require('../controllers/pizzaController.js');

const pizzaController = new PizzaController();
const uploadPizza = criarUpload('pizzas');

router.get('/pizzas', pizzaController.pegaTodos.bind(pizzaController));

router.post(
  '/pizzas',
  uploadPizza.single('imagem'),
  pizzaController.criaNovo.bind(pizzaController)
);

router.delete(
  '/pizzas/:id',
  pizzaController.deletar.bind(pizzaController)
);

module.exports = router;
