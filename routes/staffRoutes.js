import express from "express";
import multer from "multer";
import {
  createStaff,
  deleteStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
} from "../controllers/staffController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Only admin can create staff
router.post("/", protect, adminOnly, upload.single("photo"), createStaff);
router.get("/", getAllStaff);
router.get("/:id", getStaffById);
router.put("/:id", upload.single("photo"), updateStaff);
router.delete("/:id", deleteStaff);

export default router;
