import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuCategory",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  halfPrice: {
    type: Number,
  },
  is_available: {
    type: Boolean,
    default: true,
  },
  is_veg: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("MenuItem", menuItemSchema);
