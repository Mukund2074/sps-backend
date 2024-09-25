const { ObjectId } = require("mongodb");
const connectDB = require("../../db/ConnectDB");

async function GetAreas(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("Area");

        const areas = await collection.find().toArray();

        res.status(200).json({ areas, success: true, message: "Areas Data found Successfully" });

    } catch (error) {
        console.log("GetAreas.js error: ", error);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { GetAreas };
