const express = require("express");
const router = express.Router();
const upload = require('../middlewares/upload.js');
const BebidaController = require('../controllers/bebidaController.js');

const bebidaController = new BebidaController();

// CORREÇÃO: Use pegaTodos em vez de pega
router.get('/bebida', (req, res) => bebidaController.pegaTodos(req, res));
router.post('/bebida', upload.single('imagem'), (req, res) => bebidaController.criaNovo(req, res));

module.exports = router;