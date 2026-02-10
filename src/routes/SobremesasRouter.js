const express = require("express");
const router = express.Router();
const upload = require('../middlewares/upload.js');
const SobremesasController = require('../controllers/sobremesasController.js');

const sobremesasController = new SobremesasController();

// CORREÇÃO: Use pegaTodos em vez de pega
router.get('/sobremesa', (req, res) => sobremesasController.pegaTodos(req, res));
router.post('/sobremesa', upload.single('imagem'), (req, res) => sobremesasController.criaNovo(req, res));

module.exports = router;