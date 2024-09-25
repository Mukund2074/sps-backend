const { ObjectId } = require("mongodb");
const connectDB = require("../../db/ConnectDB");

async function AddDevice(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('devices');

        const { userId, deviceName, area } = req.body;

        if (!userId || !deviceName || !area) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        await collection.insertOne({
            userId: new ObjectId(userId),
            deviceName,
            area,
        });

        return res
            .status(201)
            .json({ success: true, message: "Device Added Successful" });

    } catch (error) {
        console.error("signup.js error: ", error);
        return res.status(500).json({ success: false, error: "Registration Failed" });
    }
}

module.exports = { AddDevice };