const connectDB = require("../../db/ConnectDB");
const { ObjectId } = require("mongodb");

async function getUserInfo(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("admindata");

        // Access the decoded user ID from req.user
        const userId = req.user.id; // Use req.user set by authMiddleware
        console.log("userId: ", userId);
        

        // Fetch the user information from the database
        const user = await collection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Return user information excluding the password
        const { password, ...userInfo } = user;
        res.status(200).json({ success: true, user: userInfo });
    } catch (error) {
        console.error("getUserInfo error: ", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

module.exports = { getUserInfo };
