import { Router } from "express"
import pizzariaController from "../controllers/PizzariaController";
import checkAuth from "../middlewares/checkAuth";

const router = Router();

router.get("/me", checkAuth, pizzariaController.getMe);

export default router;