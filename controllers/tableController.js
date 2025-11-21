import Tables from "../models/tables.js";

export const addTable = async (req, res) => {
  try {
    const { table_number, capacity } = req.body;

    // Confirm user is admin (safety redundancy)
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // Prevent duplicate table numbers
    const existingTable = await Tables.findOne({ table_number });
    if (existingTable) {
      return res.status(400).json({ message: "Table number already exists" });
    }

    const newTable = await Tables.create({
      table_number,
      capacity,
    });

    res
      .status(201)
      .json({ message: "Table added successfully", table: newTable });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding table", error });
  }
};
export const getTables = async (req, res) => {
  try {
    const tables = await Tables.find()
      .populate("merged_with")
      .populate("current_order_id");
    res.status(200).json(tables);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tables", error: error.message });
  }
};

// ✅ Update table status
export const updateTableStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const table = await Tables.findByIdAndUpdate(id, { status }, { new: true });
    if (!table) return res.status(404).json({ message: "Table not found" });

    res.status(200).json({ message: "Status updated", table });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
};

// ✅ Merge two tables
export const mergeTables = async (req, res) => {
  try {
    const { sourceTableId, targetTableId } = req.body;

    const sourceTable = await Tables.findById(sourceTableId);
    const targetTable = await Tables.findById(targetTableId);

    if (!sourceTable || !targetTable) {
      return res.status(404).json({ message: "One or both tables not found" });
    }
    if (
      sourceTable.status !== "available" ||
      targetTable.status !== "available"
    ) {
      return res
        .status(400)
        .json({ message: "One or both tables are not available for merging" });
    }

    sourceTable.status = "merged";
    sourceTable.merged_with = targetTable._id;
    targetTable.status = "merged";

    await sourceTable.save();
    await targetTable.save();

    res.status(200).json({ message: "Tables merged successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error merging tables", error });
  }
};

// ✅ Delete table (Admin only)
export const deleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    const table = await Tables.findByIdAndDelete(id);
    if (!table) return res.status(404).json({ message: "Table not found" });

    res.status(200).json({ message: "Table deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting table", error });
  }
};
