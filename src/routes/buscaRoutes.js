const express = require("express");
const router = express.Router();
const BuscaController = require('../controllers/BuscarController');

const buscaController = new BuscaController();

// Rota: GET /buscar?nome=termo
router.get('/buscar', buscaController.buscarGlobal.bind(buscaController));

module.exports = router;