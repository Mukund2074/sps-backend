const connectDB = require("../../db/ConnectDB");
const { ObjectId } = require("mongodb");

async function BookOnlineSlot(req, res) {
    try {
        const db = await connectDB();
        const parkingSlotsCollection = db.collection('parkingSlots');
        const onlineSlotBookingsCollection = db.collection('onlineSlotBookings');

        const { area, vehicleNo } = req.body;

        const session = req.session.user;
        if (!session) {
            return res.status(401).json({ success: false, message: "Unauthorized Access" });
        }

        const userId = session.session._id;

        if (!area || !userId) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        // Check if the user has already booked a slot
        const existingBooking = await onlineSlotBookingsCollection.findOne({ userId: new ObjectId(userId), vehicleNo });
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

module.exports = { BookOnlineSlot };
