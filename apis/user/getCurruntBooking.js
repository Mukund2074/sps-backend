const { ObjectId } = require("mongodb");
const connectDB = require("../../db/ConnectDB");

async function GetCurrentRfidBooking(req, res) {
    try {
        const db = await connectDB();
        const rfidCardsCollection = db.collection("rfidCards");
        const rfidBookingsCollection = db.collection("rfidParkings");

        const session = req.session.user;

        if (!session) {
            return res.status(401).json({ success: false, message: "Unauthorized Access" });
        }
        const userId = session.session._id;

        // Find the rfidNumber and vehicleNumber from rfidCards of the user
        const rfidCard = await rfidCardsCollection.findOne({ userId: new ObjectId(userId) });
        if (!rfidCard) {
            return res.status(404).json({ success: false, message: "RFID card not found for the user" });
        }
        const rfidNumber = rfidCard.rfidNumber;
        const vehicleNo = rfidCard.vehicleNo;

        // Find the booking from rfidBookings where exitTime is null for the user
        const booking = await rfidBookingsCollection.findOne({ rfidNumber, exitTime: null });
        if (!booking) {
            return res.status(404).json({ success: false, message: "No current booking found for the user" });
        }

        const curruntBookings = {
            _id: booking._id,
            rfidNumber: booking.rfidNumber,
            entryTime: booking.entryTime,
            exitTime: booking.exitTime,
            vehicleNo: vehicleNo
        };

        res.status(200).json({ curruntBookings, success: true, message: "Current booking found successfully" });

    } catch (error) {
        console.log("GetCurrentRfidBooking.js error: ", error);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { GetCurrentRfidBooking };
