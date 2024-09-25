const connectDB = require("../../db/ConnectDB");

async function AddFeedback(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('feedbacks');

        const { name, email, phoneNo, subject, message } = req.body;

        if (!name || !email || !phoneNo || !subject || !message) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        await collection.insertOne({
            name,
            email,
            phoneNo,
            subject,
            message,
            timestamp: new Date()
        });

        return res
            .status(201)
            .json({ success: true, message: "Feedback Added Successfully" });

    } catch (error) {
        console.error("addFeedback.js error: ", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { AddFeedback };