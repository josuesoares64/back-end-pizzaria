const express = require("express");
const router = express.Router();

const criarUpload = require('../middlewares/upload');
const EsfihaController = require('../controllers/esfihaController.js');

const esfihaController = new EsfihaController();
const uploadEsfiha = criarUpload('esfihas');

router.get('/esfiha', esfihaController.pegaTodos.bind(esfihaController));

router.get('/esfiha/:id', esfihaController.pegaUm.bind(esfihaController));

router.post(
  '/esfiha',
  uploadEsfiha.single('imagem'),
  esfihaController.criaNovo.bind(esfihaController)
);

router.put(
  '/esfiha/:id',
  esfihaController.atualizar.bind(esfihaController)
);

router.delete(
  '/esfiha/:id',
  esfihaController.deletar.bind(esfihaController)
);

module.exports = router;
