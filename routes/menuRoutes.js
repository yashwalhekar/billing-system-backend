import express from "express";
import {
  addCategory,
  getCategories,
  addMenuItem,
  getMenuItems,
  addMenuAddon,
  getMenuAddons,
  getCategoryById,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuItemStatus,
} from "../controllers/menuController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Category routes
router.post("/category", protect, authorizeRoles("admin"), addCategory);
router.get(
  "/category",
  protect,
  authorizeRoles("admin", "chef", "waiter", "cashier"),
  getCategories
);

// Menu items
router.post("/item", protect, authorizeRoles("admin"), addMenuItem);
router.get(
  "/item",
  protect,
  authorizeRoles("admin", "chef", "waiter", "cashier"),
  getMenuItems
);
// Update menu item
router.put("/item/:id", updateMenuItem);

// Delete menu item
router.delete("/item/:id", deleteMenuItem);

router.patch("/item/status/:id", toggleMenuItemStatus);

// Addons
router.post("/addon", protect, authorizeRoles("admin"), addMenuAddon);
router.get(
  "/addon",
  protect,
  authorizeRoles("admin", "chef", "waiter", "cashier"),
  getMenuAddons
);
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "waiter", "chef", "cashier"),
  getCategoryById
);

export default router;
