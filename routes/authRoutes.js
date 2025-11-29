import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
import { createAdminUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/admin/create-user", createAdminUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
