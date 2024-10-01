const { ObjectId } = require("mongodb");
const connectDB = require("../../db/ConnectDB");

async function DeleteAdmin(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('admindata');
        
        const { id } = req.params;
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Admin ID format." });
        }

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Admin not found or you are not authorized to delete this." });
        }

        return res.status(200).json({ success: true, message: "Admin deleted successfully." });
    } catch (error) {
        console.error("Delete Admin Failed:", error);
        return res.status(500).json({ success: false, message: "Error deleting Admin." });
    }
}

module.exports = { DeleteAdmin };
