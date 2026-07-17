import { Router } from 'express';
import produtoPrecoController from '../controllers/produtoPrecoController';
import checkAuth from '../middlewares/checkAuth';

const router = Router();

router.post('/:produtoId/tamanhos', checkAuth, produtoPrecoController.vincularTamanhos);
router.delete('/:produtoId/tamanhos/:tamanhoId', checkAuth, produtoPrecoController.desvincularTamanho);
router.get('/:produtoId/precos', checkAuth, produtoPrecoController.listarPrecos);
router.put('/:produtoId/precos', checkAuth, produtoPrecoController.atualizarPrecos);

export default router;