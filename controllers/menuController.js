import MenuCategory from "../models/menucategory.js";
import MenuItem from "../models/menuItems.js";
import MenuAddon from "../models/menuAddon.js";

// ✅ Add new Category (Admin only)
export const addCategory = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Only admin can add category" });

    const { name } = req.body;

    const newCategory = await MenuCategory.create({ name });
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

    const {
      category_id,
      name,
      description,
      price,
      halfPrice,
      is_available,
      is_veg,
    } = req.body;

    const newItem = await MenuItem.create({
      category_id,
      name,
      description,
      price,
      halfPrice,
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
    const items = await MenuItem.find().populate("category_id", "name");
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

// Update Menu Item
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await MenuItem.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, // ensures valid data
    }).populate("category_id", "name");

    if (!updatedItem)
      return res.status(404).json({ message: "Menu item not found" });

    res.status(200).json({
      message: "Menu item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error); // <---- Important
    res.status(500).json({ message: "Error updating menu item", error });
  }
};

// Delete Menu Item
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedItem)
      return res.status(404).json({ message: "Menu item not found" });

    res.status(200).json({
      message: "Menu item deleted successfully",
      deleted: deletedItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting menu item", error });
  }
};
export const toggleMenuItemStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // true / false

    const updatedItem = await MenuItem.findByIdAndUpdate(
      id,
      { is_available: status },
      { new: true }
    );

    if (!updatedItem)
      return res.status(404).json({ message: "Menu item not found" });

    res.status(200).json({
      message: "Status updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating menu item status", error });
  }
};
