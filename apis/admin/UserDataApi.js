//const { ObjectId } = require("mongodb");
const connectDB = require('../../db/ConnectDB');

async function UserDataApi(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('userdata');

        const userdata = await collection.find({}).toArray();

        if (userdata.length === 0) {
            return res.status(404).json({ success: false, message: "Data Not Found" });
        } else {
            return res.status(200).json({ success: true, userdataS: userdata });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: "Fetch data Failed" });
    }
}

module.exports = { UserDataApi };