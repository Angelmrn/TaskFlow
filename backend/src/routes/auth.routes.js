import { Router } from "express";
import {
  login,
  register,
  logout,
  refreshToken,
  getMe,
} from "../controllers/auth.controllers.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
//Protected routes
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, getMe);

export default router;
