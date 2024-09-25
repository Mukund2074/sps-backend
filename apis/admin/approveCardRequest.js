const { ObjectId } = require("mongodb");
const connectDB = require("../../db/ConnectDB");

async function ApproveCardRequest(req, res) {
    try {
        const db = await connectDB();
        const cardRequestsCollection = db.collection("cardRequests");
        const rfidCardsCollection = db.collection("rfidCards");

        // Extract necessary data from the request body
        const { requestId, cardNumber, balance } = req.body;

        // Check if required fields are present
        if (!cardNumber || !requestId) {
            return res.status(400).json({ success: false, message: "Invalid request" });
        }

        // Find the card request by requestId
        const cardRequest = await cardRequestsCollection.findOne({ _id: new ObjectId(requestId), status: "Pending" });

        if (!cardRequest) {
            return res.status(404).json({ success: false, message: "Card request not found or already approved" });
        }

        // Assign the card to the user
        const rfidCardData = {
            userId: new ObjectId(cardRequest.userId),
            email: cardRequest.email,
            cardNumber,
            // Add other fields you need from the card request
            status: "Active", // Assuming the card is immediately active upon approval
            timestamp: new Date(),
            balance: parseInt(balance) || 200,


        };

        // Insert the card data into the RFID cards collection
        const result = await rfidCardsCollection.insertOne(rfidCardData);


        // Update the status of the card request to "Approved"
        await cardRequestsCollection.updateOne(
            { _id: new ObjectId(requestId) },
            { $set: { status: "Approved" } }
        );

        // Respond with success message
        res.status(200).json({ success: true, message: "Card approved and assigned successfully" });
    } catch (error) {
        console.log("ApproveCardRequest.js error: ", error);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { ApproveCardRequest };
