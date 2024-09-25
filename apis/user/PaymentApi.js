const connectDB = require("../../db/ConnectDB");
const { ObjectId } = require("mongodb");

async function PaymentApi(req, res) {
    try {
        const { cardData, cardDetails, fromTime, toTime, charge, sessioninfo } = req.body;

        const db = await connectDB();
        const parkingSlotsCollection = db.collection('Area');
        const staticCardCollection = db.collection('staticCard');
        const bookingCollection = db.collection('onlineSlotBookings');

        const session = req.session.user;

        if (!session) {
            return res.status(401).json({ success: false, message: "Unauthorized Access" });
        }
        const userId = session.session._id;
        // Find user's card details
        const userCard = await staticCardCollection.findOne({ "number": cardDetails.number });

        // Check if user's card details exist
        if (!userCard) {
            console.log("User's card details not found");
            return res.status(404).json({ success: false, message: "User's card details not found" });
        }

        // Check if the user has sufficient balance
        if (userCard.balance < charge) {
            console.log('Insufficient balance');
            return res.status(400).json({ success: false, message: "Insufficient balance" });
        }

        // Record the booking
        const booking = {
            cardData,
            cardDetails,
            fromTime,
            toTime,
            charge,
            sessioninfo,
            timestamp: new Date()
        };


        // Find area data
        const areaData = await parkingSlotsCollection.findOne({ "_id": new ObjectId(cardData._id) });

        // Check if areaData is valid
        if (!areaData || !areaData.availableOnlineSlot) {
            console.log("Invalid or missing availableOnlineSlot value in Area collection");
            return res.status(500).json({ success: false, error: "Invalid or missing availableOnlineSlot value in Area collection" });
        }

        // Convert availableOnlineSlot to a number
        let availableOnlineSlot = parseInt(areaData.availableOnlineSlot);

        // Ensure there are available slots
        if (isNaN(availableOnlineSlot) || availableOnlineSlot <= 0) {
            console.log("No available online slots left");
            return res.status(400).json({ success: false, message: "No available online slots left" });
        }

        // Decrement availableOnlineSlot in Area collection
        await parkingSlotsCollection.updateOne(
            { "_id": new ObjectId(cardData._id) },
            { $set: { "availableOnlineSlot": availableOnlineSlot - 1 } }
        );

        // Decrement availableOnlineSlot in Area collection after 'fromTime'
        setTimeout(async () => {
            await parkingSlotsCollection.updateOne(
                { "_id": new ObjectId(cardData._id) },
                { $inc: { "availableOnlineSlot": -1 } }
            );
        }, new Date(fromTime) - Date.now()); // Delay based on the difference between current time and fromTime

        // Schedule job to increment the slot after 'toTime'
        setTimeout(async () => {
            await parkingSlotsCollection.updateOne(
                { "_id": new ObjectId(cardData._id) },
                { $inc: { "availableOnlineSlot": 1 } }
            );
        }, new Date(toTime) - Date.now()); // Delay based on the difference between current time and toTime


        // Update user's balance
        await staticCardCollection.updateOne(
            { "_id": userCard._id },
            { $inc: { "balance": -charge } }
        );

        // Insert booking
        await bookingCollection.insertOne(booking);

        // Return success response
        return res.status(200).json({ success: true, message: "Online slot booked successfully", booking });

    } catch (error) {
        console.error("Error in booking slot:", error);
        return res.status(500).json({ success: false, error: error.message || "Something went wrong" });
    }
}

module.exports = { PaymentApi };
