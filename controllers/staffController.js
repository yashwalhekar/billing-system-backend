import Staff from "../models/staff.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const createStaff = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, role, address } = req.body;

    if (!firstName || !lastName || !phone || !role)
      return res.status(400).json({ message: "Required fields missing" });

    const exists = await Staff.findOne({ phone });
    if (exists)
      return res.status(400).json({ message: "Staff already exists" });

    let photoUrl = null;
    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file);
      photoUrl = uploaded.secure_url;
    }

    const staff = await Staff.create({
      firstName,
      lastName,
      phone,
      email,
      address,
      role,
      photo: photoUrl,
    });

    res.status(201).json({
      message: "Staff created successfully",
      staff,
    });
  } catch (error) {
    console.error("Staff create error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//get all staff

export const getAllStaff = async (req, res) => {
  try {
    const staffData = await Staff.find().sort({ createAt: -1 });
    res.status(200).json(staffData);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* ---------------------- GET SINGLE STAFF ---------------------- */
export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* ---------------------- UPDATE STAFF ---------------------- */
export const updateStaff = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, role, address } = req.body;

    let updateData = { firstName, lastName, phone, email, role, address };

    // If new image uploaded → update Cloudinary photo
    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file);
      updateData.photo = uploaded.secure_url;
    }

    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedStaff)
      return res.status(404).json({ message: "Staff not found" });

    res.status(200).json({
      message: "Staff updated successfully",
      updatedStaff,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* ---------------------- DELETE STAFF ---------------------- */
export const deleteStaff = async (req, res) => {
  try {
    const removed = await Staff.findByIdAndDelete(req.params.id);

    if (!removed) return res.status(404).json({ message: "Staff not found" });

    res.status(200).json({
      message: "Staff deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
