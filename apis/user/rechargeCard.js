const { ObjectId } = require("mongodb");
const connectDB = require("../../db/ConnectDB");

async function RechargeCard(req, res) {
    try {
        const db = await connectDB();
        const cardAllotments = db.collection("cardAllotments");
        const staticCard = db.collection("staticCard");
        


        const { userId , balance , cardDetails } = req.body;

        if (!userId || !balance || !cardDetails) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const cardDetail = await cardAllotments.findOne({ userId : new ObjectId(userId) });
        if (!cardDetail) {
            return res.status(401).json({ success: false, message: "No request found" });
        }

        const staticCardDetail = await staticCard.findOne({ number: cardDetails.number });
        if (!staticCardDetail) {
            return res.status(401).json({ success: false, message: "Invalid card details" });
        }

        if (staticCardDetail.balance < balance) {
            return res.status(401).json({ success: false, message: "Insufficient balance" });
        }

        await staticCard.updateOne({ number: cardDetails.number }, { $set: { balance: staticCardDetail.balance - parseInt(balance) } });


        const newBalance = cardDetail.balance + parseInt(balance);
        await cardAllotments.updateOne({ userId: new ObjectId(userId) }, { $set: { balance: newBalance } });


        res.status(200).json({ success: true, message: "Card Recharged Successfully" });

    } catch (error) {
        res.status(500).json({ success: false, error: "something went wrong" });
    }
}

module.exports = { RechargeCard };
