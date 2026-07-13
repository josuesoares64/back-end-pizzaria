import { Router } from "express";
import TamanhoController from "../controllers/TamanhoController";
import autenticado from "../middlewares/checkAuth";

const router = Router();

router.get('/', autenticado, TamanhoController.getTamanho)
router.post('/', autenticado, TamanhoController.createTamanho)
router.patch("/:id", autenticado, TamanhoController.reorganizarOrdem);

export default router;