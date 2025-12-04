const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizzaController');
const upload = require('../middlewares/upload');

router.get('/', pizzaController.getAll);
router.post('/', upload.single('imagem'), pizzaController.create);

module.exports = router;
