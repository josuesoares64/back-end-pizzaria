import { Router } from "express";
import AuthController from "../controllers/AuthController";
import autenticado from "../middlewares/checkAuth";

const router = Router();
const authController = new AuthController();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/register-owner", authController.registerOwner);
router.post("/register-funcionario", autenticado, authController.registerFuncionario);
router.get("/funcionarios", autenticado, authController.listarFuncionarios);

export default router;