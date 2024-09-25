const connectDB = require('../../db/ConnectDB');
const { ObjectId } = require("mongodb");

async function DeleteArea(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('Area');

        const { id } = req.params; // Correctly get id from req.params
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Area not found or you are not authorized to delete this Area." });
        }

        return res.status(200).json({ success: true, message: "Area deleted successfully.", DeleteData: result });
    } catch (error) {
        console.error("Delete Area Failed:", error);
        return res.status(500).json({ success: false, error: error });
    }
}

module.exports = { DeleteArea };