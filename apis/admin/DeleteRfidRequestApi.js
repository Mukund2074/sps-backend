const { ObjectId } = require("mongodb");
const connectDB = require("../../db/ConnectDB");

async function DeleteRfidRequestApi(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('cardRequests');
        
        const { id } = req.params;
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid user Request ID format." });
        }

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "User Request not found or you are not authorized to delete this." });
        }

        return res.status(200).json({ success: true, message: "User Request deleted successfully." });
    } catch (error) {
        console.error("Delete User Request Failed:", error);
        return res.status(500).json({ success: false, message: "Error deleting user Request." });
    }
}

module.exports = { DeleteRfidRequestApi };
