const { ObjectId } = require("mongodb");
const connectDB = require("../../db/ConnectDB");

async function ApplyForCard(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('cardRequests');

        const { name, email, phoneNo, address, aadhaarNo, vehicleNo } = req.body;

        const session = req.session.user;
        if (!session) {
            return res.status(401).json({ success: false, message: "Unauthorized Access" });
        }

        const userId = session.session._id;

        if (!name || !email || !phoneNo || !address || !aadhaarNo || !vehicleNo) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        const requestExist = await collection.findOne({ userId: new ObjectId(userId) });
        if (requestExist) {
            return res.status(401).json({ success: false, message: "Request already submitted" });
        }

        const isVehicleExist = await collection.findOne({ vehicleNo });
        const isAadhaarExist = await collection.findOne({ aadhaarNo });
        if (isVehicleExist) {
            return res.status(401).json({ success: false, message: "Vehicle already registered" });
        }
        if (isAadhaarExist) {
            return res.status(401).json({ success: false, message: "Aadhaar already registered" });
        }

        await collection.insertOne({
            name,
            email,
            phoneNo,
            address,
            aadhaarNo,
            vehicleNo,
            userId: new ObjectId(userId),
            status: "Pending",
            timestamp: new Date()
        });

        return res
            .status(201)
            .json({ success: true, message: "Request Submitted Successfully" });

    } catch (error) {
        console.error("ApplyForCard.js error: ", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { ApplyForCard };