import { Router } from "express"
import pizzariaController from "../controllers/PizzariaController";
import checkAuth from "../middlewares/checkAuth";
import { upload } from "../middlewares/upload";

const router = Router();

router.get("/", pizzariaController.listaPizzarias)
router.get("/me", checkAuth, pizzariaController.getMe);
router.get("/:slug", pizzariaController.getSlug)
router.patch("/me", checkAuth, pizzariaController.editarPizzaria)
router.patch("/me/logo", checkAuth, upload.single('logo'), pizzariaController.uploadLogo)
router.patch("/:id/status", checkAuth, pizzariaController.alterarStatusPizzaria);

export default router;