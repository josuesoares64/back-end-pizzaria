import { Router } from 'express';
import ProdutoController from '../controllers/ProdutoController';
import autenticado from '../middlewares/checkAuth';

const router = Router();

router.get('/', autenticado, ProdutoController.getProduto);
router.post('/', autenticado, ProdutoController.createProduto);

export default router;