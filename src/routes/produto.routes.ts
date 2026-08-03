import { Router } from 'express';
import ProdutoController from '../controllers/ProdutoController';
import autenticado from '../middlewares/checkAuth';
import { upload } from '../middlewares/upload';

const router = Router();

router.get('/', autenticado, ProdutoController.getProduto);
router.post('/', autenticado, ProdutoController.createProduto);
router.patch('/:id', autenticado, ProdutoController.updateProduto);
router.patch('/:id/status', autenticado, ProdutoController.updateStatusProduto);
router.patch('/:id/imagem', autenticado, upload.single('imagem'), ProdutoController.uploadImagem);
router.delete('/:id', autenticado, ProdutoController.deleteProduto);

export default router;