const connectDB = require('../../db/ConnectDB');

async function ManageAreaApi(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('Area');

        const AreaData = await collection.find({}).toArray();

        if (AreaData.length === 0) {
            return res.status(404).json({ success: false, message: "Data Not Found" });
        } else {
            return res.status(200).json({ success: true, Managearea: AreaData });
        }

    } catch (error) {
        console.error("Fetch Data Failed:", error);
        return res.status(500).json({ success: false, error: "Fetch data Failed" });
    }
}

module.exports = { ManageAreaApi };