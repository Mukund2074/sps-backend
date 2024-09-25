const { ObjectId } = require("mongodb");
const connectDB = require("../../db/ConnectDB");

async function DeleteRfidRequestApi(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('cardRequests');

        const { _id } = req.body; // Assuming productId is passed in the request URL
        const result = await collection.deleteOne({ _id: new ObjectId(_id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Request not found or you are not authorized to delete this Request." });
        }

        return res.status(200).json({ success: true, message: "Request  deleted successfully.", DeleteData: result });
    } catch (error) {
        console.error("Delete Request Failed:", error);
        return res.status(500).json({ success: false, error: error });
    }
}

module.exports = { DeleteRfidRequestApi };
