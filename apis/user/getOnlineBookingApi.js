const connectDB = require('../../db/ConnectDB');
const { ObjectId } = require("mongodb");

async function GetOnlineBookingApi(req, res) {
    try {
        const db = await connectDB();
        const onlineBooking = db.collection("onlineSlotBookings");
        const userData = db.collection("userdata");
        const Area = db.collection("Area");

        console.log("req.params.id: ", req.params);

        const booking = await onlineBooking.find({ userId: new ObjectId(req.params.id) }).toArray();

        if (booking.length === 0) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        const user = await userData.findOne({ _id: new ObjectId(booking[0].userId) });
        const area = await Area.findOne({ _id: new ObjectId(booking[0].areaId) });

        const responce = { // Define the responce object correctly
            bookingId: booking[0]._id, // Booking ID
            charge: booking[0].charge,
            fromTime: booking[0].fromTime,
            toTime: booking[0].toTime,
            userName: user ? user.name : null, // Handle case where user might not be found
            areaName: area ? area.Name : null, // Handle case where area might not be found
            locality: area ? area.Locality : null,
            zipcode: area ? area.Zipcode : null,
        };

        res.status(200).json({ bookings: responce   , success: true, message: "Booking found successfully" });
        
    } catch (error) {
        console.log("GetOnlineBookingApi.js error: ", error);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { GetOnlineBookingApi };
