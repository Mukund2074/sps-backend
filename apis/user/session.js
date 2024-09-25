const { ObjectId } = require("mongodb");
const connectDB = require("../../db/ConnectDB");

async function UserSession(req, res) {
    try {

        const userDatas = req.session.user;

        if (!userDatas) {
            return res.status(401).json({ message: "No sesssion created!" });
        } else {

            const db = await connectDB();
            const cardCollection = db.collection("rfidCards");
            const rfidCards = await cardCollection.findOne({ userId: new ObjectId(userDatas.session._id) });

            var isCardAssigned = false;
            if (rfidCards) {
                isCardAssigned = true;
            }

            res.status(200)
                .json({ sessionData: userDatas, isCardAssigned, success: true, message: "session got Successful" });

        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { UserSession }