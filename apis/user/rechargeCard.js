const { ObjectId } = require("mongodb");
const connectDB = require("../../db/ConnectDB");

async function RechargeCard(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("rfidCards");

        const { balance } = req.body;
        if (!balance) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const session = req.session.user;

        if (!session) {
            return res.status(401).json({ success: false, message: "Unauthorized Access" });
        }
        const userId = session.session._id;

        const cardDetail = await collection.findOne({ userId: new ObjectId(userId) });
        if (!cardDetail) {
            return res.status(401).json({ success: false, message: "No request found" });
        }

        const newBalance = cardDetail.balance + parseInt(balance);

        await collection.updateOne({ userId: new ObjectId(userId) }, { $set: { balance: parseInt(newBalance) } });

        res.status(200).json({ success: true, message: "Card Recharged Successfully" });

    } catch (error) {
        console.log("RechargeCard.js error: ", error);
        res.status(500).json({ success: false, error: "something went wrong" });
    }
}

module.exports = { RechargeCard };
