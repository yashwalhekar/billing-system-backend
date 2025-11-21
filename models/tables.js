import mongoose from "mongoose";

const tablesSchema = new mongoose.Schema({
  table_number: {
    type: String,
    unique: true,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "occupied", "merge", "reserved"],
    default: "available",
  },
  merged_with: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tables",
    default: null,
  },
  current_order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Tables", tablesSchema);
