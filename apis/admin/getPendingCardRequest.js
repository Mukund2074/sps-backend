const connectDB = require("../../db/ConnectDB");

async function GetPendingCardRequest(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("cardRequests");

        const cardRequests = await collection.find({ status: "Pending" }).toArray();


        if (!cardRequests) {
            return res
                .status(401)
                .json({ success: false, message: "No request found" });
        }

        res
            .status(200)
            .json({ cardRequests, success: true, message: "Request found Successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "something went wrong" });
    }
}

module.exports = { GetPendingCardRequest };
