const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function AddComplaint(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('complaint');

        const { name, subject, complaint } = req.body;

        if (!name || !subject || !complaint) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        await collection.insertOne({
            name,
            subject,
            complaint,
            timestamp: new Date()
        });

        return res
            .status(201)
            .json({ success: true, message: "Complaint added Successfully" });

    } catch (error) {
        console.error("AddComplaint.js error: ", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { AddComplaint };