const { ObjectId } = require("mongodb");
const connectDB = require("../../db/ConnectDB");

async function DeleteUser(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('userdata');
console.log(req.body);

        const { _id } = req.body; 
        const result = await collection.deleteOne({ _id: new ObjectId(_id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "User not found or you are not authorized to delete this." });
        }

        return res.status(200).json({ success: true, message: "User deleted successfully.", DeleteData: result });
    } catch (error) {
        console.error("Delete User Failed:", error);
        return res.status(500).json({ success: false, error: error });
    }
}

module.exports = { DeleteUser };
