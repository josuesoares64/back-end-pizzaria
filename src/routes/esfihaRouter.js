const express = require("express");
const router = express.Router();
const EsfihaController = require('../controllers/esfihaController.js');

const esfihaController = new EsfihaController();

router.get('/esfiha', (req, res) => esfihaController.pegaTodos(req, res));

module.exports = router;
