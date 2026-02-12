const express = require("express");
const router = express.Router();

const criarUpload = require('../middlewares/upload');
const SobremesasController = require('../controllers/sobremesasController.js');

const sobremesasController = new SobremesasController();
const uploadSobremesa = criarUpload('sobremesas');

router.get('/sobremesa', sobremesasController.pegaTodos.bind(sobremesasController));

router.get('/sobremesa/:id', sobremesasController.pegaUm.bind(sobremesasController));

router.post(
  '/sobremesa',
  uploadSobremesa.single('imagem'),
  sobremesasController.criaNovo.bind(sobremesasController)
);

router.put(
  "/sobremesa/:id",
  sobremesasController.atualizar.bind(sobremesasController)
);

router.delete(
  '/sobremesa/:id',
  sobremesasController.deletar.bind(sobremesasController)
);

module.exports = router;
