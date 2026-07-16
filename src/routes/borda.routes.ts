import { Router } from "express";
import autenticado from "../middlewares/checkAuth";
import BordaController from "../controllers/BordaController";

const router = Router();

router.get('/', autenticado, BordaController.getBorda)
router.post('/', autenticado, BordaController.createBorda)
router.patch('/:id', autenticado, BordaController.updateBorda)
router.patch('/:id/status', autenticado, BordaController.toggleStatusBorda)
router.delete('/:id', autenticado, BordaController.deleteBorda)

export default router;