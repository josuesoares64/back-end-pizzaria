import { Router } from "express";
import CategoriaController from "../controllers/CategoriaController";
import autenticado from "../middlewares/checkAuth";

const router = Router();


router.get('/', autenticado, CategoriaController.getCategoria);
router.post('/', autenticado, CategoriaController.createCategoria);
router.patch('/:id', autenticado, CategoriaController.updateCategoria);
router.patch('/:id/status', autenticado, CategoriaController.updateCategoriaStatus);

export default router;