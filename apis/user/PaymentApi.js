const connectDB = require("../../db/ConnectDB");
const { ObjectId } = require("mongodb");

async function PaymentApi(req, res) {
    try {
        const { UserId , Area , PaymentCard , fromTime, toTime, charge } = req.body;

        const db = await connectDB();
        const parkingSlotsCollection = db.collection('Area');
        const staticCardCollection = db.collection('staticCard');
        const bookingCollection = db.collection('onlineSlotBookings');

        const userCard = await staticCardCollection.findOne({ "number": PaymentCard.number });

        // Check if user's card details exist
        if (!userCard) {
            return res.status(404).json({ success: false, message: "User's card details not found" });
        }

        // Check if the user has sufficient balance
        if (userCard.balance < charge) {
            return res.status(400).json({ success: false, message: "Insufficient balance" });
        }

        // Record the booking
        const booking = {
            userId: new ObjectId(UserId),
            areaId: new ObjectId(Area._id),
            fromTime: new Date(fromTime),
            toTime: new Date(toTime),
            charge: charge
        };

        const areaData = await parkingSlotsCollection.findOne({ "_id": new ObjectId(Area._id) });

        if (!areaData || !areaData.availableOnlineSlot) {
            return res.status(400).json({ success: false, error: "Invalid or missing availableOnlineSlot value in Area collection" });
        }

        let availableOnlineSlot = parseInt(areaData.availableOnlineSlot);

        // Ensure there are available slots
        if (isNaN(availableOnlineSlot) || availableOnlineSlot <= 0) {
            return res.status(400).json({ success: false, message: "No available online slots left" });
        }

        // Decrement availableOnlineSlot in Area collection
        await parkingSlotsCollection.updateOne(
            { "_id": new ObjectId(Area._id) },
            { $set: { "availableOnlineSlot": availableOnlineSlot - 1 } }
        );

        // Decrement availableOnlineSlot in Area collection after 'fromTime'
        setTimeout(async () => {
            await parkingSlotsCollection.updateOne(
                { "_id": new ObjectId(cardData._id) },
                { $inc: { "availableOnlineSlot": -1 } }
            );
        }, new Date(fromTime) - Date.now()); // Delay based on the difference between current time and fromTime

        
        // Update user's balance
        await staticCardCollection.updateOne(
            { "_id": userCard._id },
            { $inc: { "balance": -charge } }
        );

        // Insert booking
        await bookingCollection.insertOne(booking);

        

        // Schedule job to increment the slot after 'toTime'
        setTimeout(async () => {
            await parkingSlotsCollection.updateOne(
                { "_id": new ObjectId(cardData._id) },
                { $inc: { "availableOnlineSlot": 1 } }
            );
        }, new Date(toTime) - Date.now()); // Delay based on the difference between current time and toTime



        // Return success response
        return res.status(200).json({ success: true, message: "Online slot booked successfully", booking });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message || "Something went wrong" });
    }
}

module.exports = { PaymentApi };
