import mongoose from "mongoose";

const menuAddonSchema = new mongoose.Schema({
  menu_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true,
  },
  addon_name: {
    type: String,
    required: true,
    trim: true,
  },
  addon_price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("MenuAddon", menuAddonSchema);
