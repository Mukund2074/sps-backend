const connectDB = require('../../db/ConnectDB');

async function GetFeedback(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("feedbacks");

        const feedbacks = await collection.find().toArray();

        if (!feedbacks) {
            return res
                .status(401)
                .json({ success: false, message: "No feedbacks Available" });
        }

        res
            .status(200)
            .json({ feedbacks, success: true, message: "feedbacks found Successfully" });
    } catch (error) {
        console.log("GetFeedback.js error: ", error);
        res.status(500).json({ success: false, error: "something went wrong" });
    }
}

module.exports = { GetFeedback };
