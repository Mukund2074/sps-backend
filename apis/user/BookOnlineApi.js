const connectDB = require("../../db/ConnectDB");
const { ObjectId } = require("mongodb");

async function BookOnlineApi(req, res) {
    try {
        const db = await connectDB();
        const parkingSlotsCollection = db.collection('Area');
        const onlineSlotBookingsCollection = db.collection('onlineSlotBookings');
        const staticCardCollection = db.collection('staticCard'); // Assuming the collection name is 'staticCard'

        const { userId, Name , Locality , Zipcode , availableOnlineSlot } = req.body;

        if (!Name || !Locality || !Zipcode || !availableOnlineSlot || !userId) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        // Check if the user has already booked a slot
        const existingBooking = await onlineSlotBookingsCollection.findOne({ userId: new ObjectId(userId) , vehicleNo });
        if (existingBooking) {
            return res.status(400).json({ success: false, message: "User has already booked a slot" });
        }

        const parkingSlot = await parkingSlotsCollection.findOne({ _id: new ObjectId(area) });
        if (!parkingSlot) {
            return res.status(404).json({ success: false, message: "Parking slot not found" });
        }

        if (parkingSlot.availableOnlineSlot === 0 || parkingSlot.availableOnlineSlot < 0) {
            return res.status(400).json({ success: false, message: "No available online slots" });
        }

        // Calculate booking duration (assuming timestamp is stored in the database)
        const bookingDurationInHours = Math.abs((new Date() - parkingSlot.timestamp) / 36e5);

        let balanceDeduction = 0;
        if (bookingDurationInHours <= 1) {
            balanceDeduction = 10;
        } else {
            balanceDeduction = bookingDurationInHours * 10;
        }

        const userCard = await staticCardCollection.findOne({ userId: new ObjectId(userId) });
        if (!userCard) {
            return res.status(404).json({ success: false, message: "User's card details not found" });
        }

        const newBalance = userCard.balance - balanceDeduction;
        if (newBalance < 0) {
            return res.status(400).json({ success: false, message: "Insufficient balance" });
        }

        await staticCardCollection.updateOne(
            { userId: new ObjectId(userId) },
            { $set: { balance: newBalance } }
        );

        await parkingSlotsCollection.updateOne(
            { _id: new ObjectId(area) },
            { $set: { availableOnlineSlot: parkingSlot.availableOnlineSlot - 1 } }
        );

        await onlineSlotBookingsCollection.insertOne({
            area: new ObjectId(area),
            userId: new ObjectId(userId),
            vehicleNo,
            timestamp: new Date()
        });

        return res
            .status(200)
            .json({ success: true, message: "Online slot booked successfully" });

    } catch (error) {
        console.error("bookOnlineSlot.js error: ", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { BookOnlineApi };
