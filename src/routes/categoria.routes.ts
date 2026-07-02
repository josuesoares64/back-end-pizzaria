import { Router } from "express";
import CategoriaController from "../controllers/CategoriaController";
import autenticado from "../middlewares/checkAuth";

const router = Router();


router.get('/', autenticado, CategoriaController.getCategoria);
router.post('/', autenticado, CategoriaController.createCategoria);

export default router;