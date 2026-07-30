import { Router } from 'express';
import ProdutoController from '../controllers/ProdutoController';
import autenticado from '../middlewares/checkAuth';

const router = Router();

router.get('/', autenticado, ProdutoController.getProduto);
router.post('/', autenticado, ProdutoController.createProduto);
router.patch('/:id', autenticado, ProdutoController.updateProduto);
router.patch('/:id/status', autenticado, ProdutoController.updateStatusProduto);
router.delete('/:id', autenticado, ProdutoController.deleteProduto);

export default router;