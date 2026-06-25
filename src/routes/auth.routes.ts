import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/register-owner", authController.registerOwner);

export default router;