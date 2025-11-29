import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },

    photo: { type: String },
    joinDate: { type: Date, default: Date.now },
    role: {
      type: String,
      enum: ["chef", "waiter", "cashier"],
      required: true,
    },
    address: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Staff", staffSchema);
