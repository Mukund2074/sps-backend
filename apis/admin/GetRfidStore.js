//const { ObjectId } = require("mongodb");
const connectDB = require('../../db/ConnectDB');

async function GetRfidStore(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('rfidStore');

        const rfidStore = await collection.find({}).toArray();

        if (rfidStore.length === 0) {
            return res.status(404).json({ success: false, message: "Data Not Found" });
        } else {
            return res.status(200).json({ success: true, RFID: rfidStore });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: "Fetch data Failed" });
    }
}

module.exports = { GetRfidStore };