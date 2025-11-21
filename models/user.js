// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone: { type: String, required: true, unique: true }, // use String (for leading zeros, etc.)
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "chef", "waiter", "cashier"],
    default: "waiter",
  },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Index phone for fast lookups
userSchema.index({ phone: 1 });

export default mongoose.model("User", userSchema);
