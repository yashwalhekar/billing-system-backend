import MenuCategory from "../models/menucategory.js";
import MenuItem from "../models/menuItems.js";
import MenuAddon from "../models/menuAddon.js";

// ✅ Add new Category (Admin only)
export const addCategory = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Only admin can add category" });

    const { category, name } = req.body;

    const newCategory = await MenuCategory.create({ category, name });
    res.status(201).json({ message: "Category added", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Error adding category", error });
  }
};

// ✅ Get all Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await MenuCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// ✅ Add new Menu Item (Admin only)
export const addMenuItem = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Only admin can add items" });

    const { category_id, name, price, is_available, is_veg } = req.body;

    const newItem = await MenuItem.create({
      category_id,
      name,
      price,
      is_available,
      is_veg,
    });

    res.status(201).json({ message: "Menu item added", item: newItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding menu item", error });
  }
};

// ✅ Get all Menu Items (with category populated)
export const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find().populate(
      "category_id",
      "name category"
    );
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu items", error });
  }
};

// ✅ Add Addon (Admin only)
export const addMenuAddon = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Only admin can add addons" });

    const { menu_id, addon_name, addon_price } = req.body;

    const newAddon = await MenuAddon.create({
      menu_id,
      addon_name,
      addon_price,
    });
    res.status(201).json({ message: "Addon added", addon: newAddon });
  } catch (error) {
    res.status(500).json({ message: "Error adding addon", error });
  }
};

// ✅ Get all Addons
export const getMenuAddons = async (req, res) => {
  try {
    const addons = await MenuAddon.find().populate("menu_id", "name price");
    res.status(200).json(addons);
  } catch (error) {
    res.status(500).json({ message: "Error fetching addons", error });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await MenuCategory.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      id: category._id,
      category: category.category,
      name: category.name,
      is_active: category.is_active,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};
