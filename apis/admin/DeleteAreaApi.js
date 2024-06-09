const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbconnect");

async function DeleteArea(req, res) {
    try { 
        const db = await connectDB();
        const collection = db.collection('Area');

        if (!req.session || !req.session.user || !req.session.user.session || !req.session.user.session._id ) {
            return res.status(401).json({ success: false, message: "Unauthorized User!" });
        }

        //const userId = req.session.user.session._id;
        const { _id } = req.body; // Assuming productId is passed in the request URL
        const result = await collection.deleteOne({ _id : new ObjectId(_id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Area not found or you are not authorized to delete this Area." });
        }

        return res.status(200).json({ success: true, message: "Area deleted successfully." , DeleteData : result });
    } catch (error) {
        console.error("Delete Product Failed:", error);
        return res.status(500).json({ success: false, error: error });
    }
}

module.exports = { DeleteArea };
