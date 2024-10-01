const connectDB = require('../../db/ConnectDB');

async function GetComplaint(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("complaint");

        const complaint = await collection.find().toArray();

        if (!complaint) {
            return res
                .status(401)
                .json({ success: false, message: "No complaint Available" });
        }

        res
            .status(200)
            .json({ complaint, success: true, message: "complaint found Successfully" });

    } catch (error) {
        res.status(500).json({ success: false, error: "something went wrong" });
    }
}

module.exports = { GetComplaint };