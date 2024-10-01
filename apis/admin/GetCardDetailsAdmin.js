const connectDB = require("../../db/ConnectDB");
const { ObjectId } = require("mongodb");

const GetCardDetailsAdmin = async (req, res) => {
    try {
        const db = await connectDB();
        const cardAllotments = db.collection("cardAllotments");
        const userData = db.collection("userdata");
        const rfidStore = db.collection("rfidStore");

        const { id } = req.params;

        if (!id) {
            return res.status(400).send("Missing RFID id");
        }

        if (!ObjectId.isValid(id)) {
            return res.status(400).send("Invalid id format");
        }

        const rfidCard = await rfidStore.findOne({ _id: new ObjectId(id) });
        if (!rfidCard) {
            return res.status(404).send("RFID card not found");
        }

        const cardRequest = await cardAllotments.findOne({ rfidId: new ObjectId(rfidCard._id) });
        if (!cardRequest) {
            return res.status(404).send("Card request not found");
        }

        const user = await userData.findOne({ _id: new ObjectId(cardRequest.userId) });
        if (!user) {
            return res.status(404).send("User not found");
        }

        const { _id: rfidCardId, alloted, ...rfidCardWithoutId } = rfidCard;
        const { _id: cardRequestId, rfidId, userId: cardUserId, ...cardRequestWithoutId } = cardRequest; // Renamed userId to cardUserId
        const { _id: userIdValue, hasCard, ...userWithoutId } = user; // Renamed _id to userIdValue

        const cardDetails = {
            ...rfidCardWithoutId,
            ...cardRequestWithoutId,
            ...userWithoutId
        };

        res.status(200).send({
            success: true,
            cardDetails,
            message: "Card details fetched successfully"
        });

    } catch (error) {
        console.error("Error fetching card details:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { GetCardDetailsAdmin };
