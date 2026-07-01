import { Router } from "express"
import pizzariaController from "../controllers/PizzariaController";
import checkAuth from "../middlewares/checkAuth";

const router = Router();

router.get("/", pizzariaController.listaPizzarias)
router.get("/me", checkAuth, pizzariaController.getMe);
router.get("/:slug", pizzariaController.getSlug)
router.patch("/me", checkAuth, pizzariaController.editarPizzaria)

export default router;