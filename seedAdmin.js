// seedAdmin.js
import User from "./models/user.js";

const seedAdmin = async () => {
  const adminExists = await User.findOne({ role: "admin" });
  if (!adminExists) {
    await User.create({
      first_name: "Yash",
      last_name: "Walhekar",
      phone: "7350304508",
      password: "Admin@123",
      role: "admin",
    });
    console.log("Admin User Created");
  }
};

export default seedAdmin;
