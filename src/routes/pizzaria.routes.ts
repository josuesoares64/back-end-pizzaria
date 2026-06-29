import { Router } from "express"
import pizzariaController from "../controllers/PizzariaController";
import checkAuth from "../middlewares/checkAuth";

const router = Router();

router.get("/pizzarias", pizzariaController.listaPizzarias)
router.get("/me", checkAuth, pizzariaController.getMe);
router.patch("/me", checkAuth, pizzariaController.editarPizzaria)

export default router;