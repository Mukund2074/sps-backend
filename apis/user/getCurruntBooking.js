const { ObjectId } = require("mongodb");
const connectDB = require("../../db/ConnectDB");

async function GetCurrentRfidBooking(req, res) {
    try {
        const db = await connectDB();
        const rfidCardsCollection = db.collection("cardAllotments");
        const rfidBookingsCollection = db.collection("rfidParkings");

        const { id } = req.params;

        // Find the rfidNumber and vehicleNumber from rfidCards of the user
        const rfidCard = await rfidCardsCollection.findOne({ _id: new ObjectId(id) });
        if (!rfidCard) {
            return res.status(404).json({ success: false, message: "RFID card not found for the user" });
        }
        const rfidId = rfidCard.id;
        const booking = await rfidBookingsCollection.findOne({ rfidId, exitTime: null });
        if (!booking) {
            return res.status(404).json({ success: false, message: "No current booking found for the user" });
        }

        const curruntBookings = {
            _id: booking._id,
            rfidNumber: booking.rfidNumber,
            entryTime: booking.entryTime,
            exitTime: booking.exitTime,
        };
        res.status(200).json({ curruntBookings, success: true, message: "Current booking found successfully" });

    } catch (error) {
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { GetCurrentRfidBooking };
