const { ObjectId } = require("mongodb");
const connectDB = require("../../db/ConnectDB");

async function ApplyForCard(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('cardRequests');

        const { userId , name, email, phoneNo, address } = req.body;
        
        if (!name || !email || !phoneNo || !address ) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        const requestExist = await collection.findOne({ userId: new ObjectId(userId) });
        if (requestExist) {
            return res.status(401).json({ success: false, message: "Request already submitted" });
        }


        await collection.insertOne({
            name,
            email,
            phoneNo,
            address,
            userId: new ObjectId(userId),
            status: "Pending",
            timestamp: new Date()
        });

        return res
            .status(201)
            .json({ success: true, message: "Request Submitted Successfully" });

    } catch (error) {
        console.error("ApplyForCard error: ", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { ApplyForCard };