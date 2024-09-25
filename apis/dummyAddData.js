const { ObjectId } = require("mongodb");
const connectDB = require("../db/ConnectDB");

async function AddSensorData(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('usSensorData');

        const { sensorValue, deviceId, deviceName, area } = req.body;

        if (!sensorValue || !deviceId || !deviceName || !area) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        await collection.insertOne({
            sensorName: "ULTRASONIC SENSOR",
            sensorValue,
            deviceId: new ObjectId(deviceId),
            deviceName,
            area,
            timestamp: new Date()
        });

        return res
            .status(201)
            .json({ success: true, message: "Data added Successful" });

    } catch (error) {
        console.error("signup.js error: ", error);
        return res.status(500).json({ success: false, error: "Registration Failed" });
    }
}

module.exports = { AddSensorData };