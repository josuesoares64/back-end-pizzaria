const express = require("express");
const router = express.Router();
const upload = require('../middlewares/upload.js')
const PizzaController = require('../controllers/pizzaController.js');

const pizzaController = new PizzaController();

router.get('/pizzas', (req, res) => pizzaController.pegaTodos(req, res));
router.post(
    '/pizzas',
    upload.single('imagem'),  // deve ser o MESMO nome que você envia no Postman
    (req, res) => pizzaController.criaNovo(req, res)
);

module.exports = router;
