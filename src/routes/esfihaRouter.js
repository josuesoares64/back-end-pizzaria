const express = require("express");
const router = express.Router();
const upload = require('../middlewares/upload.js')
const EsfihaController = require('../controllers/esfihaController.js');

const esfihaController = new EsfihaController();

router.get('/esfiha', (req, res) => esfihaController.pegaTodos(req, res));
router.post('/esfiha', upload.single('imagem'), (req, res) => esfihaController.criaNovo(req, res));


module.exports = router;
