import express from "express";
import {
  addTable,
  getTables,
  updateTableStatus,
  mergeTables,
  deleteTable,
} from "../controllers/tableController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Admin only
router.post("/", protect, authorizeRoles("admin"), addTable);

// All roles can view tables
router.get(
  "/",
  protect,
  authorizeRoles("admin", "waiter", "chef", "cashier"),
  getTables
);

// Waiter or Admin can update table status
router.patch(
  "/:id/status",
  protect,
  authorizeRoles("admin", "waiter", "cashier"),
  updateTableStatus
);

// Admin only - merge tables
router.post("/merge", protect, authorizeRoles("admin"), mergeTables);

// Admin only
router.delete("/:id", protect, authorizeRoles("admin"), deleteTable);

export default router;
