const express = require("express");
const router = express.Router();
const PizzaController = require('../controllers/pizzaController.js');

const pizzaController = new PizzaController();

router.get('/pizzas', (req, res) => pizzaController.pegaTodos(req, res));

module.exports = router;
