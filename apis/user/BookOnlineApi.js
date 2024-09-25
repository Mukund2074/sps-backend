const connectDB = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function BookOnlineApi(req, res) {
    try {
        const db = await connectDB();
        const parkingSlotsCollection = db.collection('Area');
        const onlineSlotBookingsCollection = db.collection('onlineSlotBookings');
        const staticCardCollection = db.collection('staticCard'); // Assuming the collection name is 'staticCard'

        const { Name , Locality , Zipcode , availableOnlineSlot } = req.body;

        const session = req.session.user;
        if (!session) {
            return res.status(401).json({ success: false, message: "Unauthorized Access" });
        }

        const userId = session.session._id;

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
        } else if (bookingDurationInHours <= 2) {
            balanceDeduction = 20;
        } else {
            balanceDeduction = 30;
        }

        // Fetch balance from static card collection
        const userCard = await staticCardCollection.findOne({ userId: new ObjectId(userId) });
        if (!userCard) {
            return res.status(404).json({ success: false, message: "User's card details not found" });
        }

        // Deduct balance
        const newBalance = userCard.balance - balanceDeduction;
        if (newBalance < 0) {
            return res.status(400).json({ success: false, message: "Insufficient balance" });
        }

        // Update user's balance
        await staticCardCollection.updateOne(
            { userId: new ObjectId(userId) },
            { $set: { balance: newBalance } }
        );

        // Update parking slot availability
        await parkingSlotsCollection.updateOne(
            { _id: new ObjectId(area) },
            { $set: { availableOnlineSlot: parkingSlot.availableOnlineSlot - 1 } }
        );

        // Insert booking into database
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
