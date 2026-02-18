const express = require("express");
const router = express.Router();

const criarUpload = require('../middlewares/upload');
const BebidaController = require('../controllers/bebidaController.js');

const bebidaController = new BebidaController();
const uploadBebida = criarUpload('bebidas');

router.get('/bebida', bebidaController.pegaTodos.bind(bebidaController));

router.get('/bebida/:id', bebidaController.pegaUm.bind(bebidaController));

router.post(
  '/bebida',
  uploadBebida.single('imagem'),
  bebidaController.criaNovo.bind(bebidaController)
);

router.put(
  '/bebida/:id',
  uploadBebida.single('imagem'), // Adicione isso para conseguir ler o body e arquivos
  bebidaController.atualizar.bind(bebidaController)
);

router.delete(
  '/bebida/:id',
  bebidaController.deletar.bind(bebidaController)
);

module.exports = router;
