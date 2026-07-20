import { Router } from "express";
import enderecoController from "../controllers/EnderecoController";
import checkAuth from "../middlewares/checkAuth";

const router = Router();

router.get("/me", checkAuth, enderecoController.getEndereco);
router.put("/me", checkAuth, enderecoController.upsertEndereco);

export default router;