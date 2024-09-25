const connectDB = require('../../db/ConnectDB');
const { ObjectId } = require("mongodb");

async function GetOnlineBooking(req, res) {
    try {
        const db = await connectDB();
        const onlineBooking = db.collection("onlineSlotBookings");

        const booking = await onlineBooking.find({}).toArray();

        if (booking.length > 0) {
            // Send success response if data is found
            res.status(200).json({ bookings: booking, success: true, message: "Booking found successfully" });
        } else {
            // Send failure response if no data is found
            res.status(404).json({ success: false, message: "Booking not found" });
        }
    } catch (error) {
        console.log("GetOnlineBooking.js error: ", error);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { GetOnlineBooking };
