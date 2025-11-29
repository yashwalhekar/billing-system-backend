import User from "../models/user.js";
import jwt from "jsonwebtoken";
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, phone, password, role } = req.body;
    if (!first_name || !last_name || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userExists = await User.findOne({ phone });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });
    const user = await User.create({
      first_name,
      last_name,
      phone,
      password,
      role,
    });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
export const createAdminUser = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Only admin can create admins" });
  }

  const { first_name, last_name, phone, password } = req.body;

  const exists = await User.findOne({ phone });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({
    first_name,
    last_name,
    phone,
    password,
    role: "admin",
  });

  res.status(201).json({ message: "Admin created", user });
};
// Login User
export const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password)
      return res.status(400).json({ message: "Phone and password required" });
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
    const token = generateToken(user._id, user.role);
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// Logout User
export const logoutUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "Logout successful. Please remove the token on the client side.",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
