const { ObjectId } = require("mongodb");
const connectDB = require("../../db/ConnectDB");

async function GetCardDetailUser(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("rfidCards");

        const session = req.session.user;

        if (!session) {
            return res.status(401).json({ success: false, message: "Unauthorized Access" });
        }
        const userId = session.session._id;

        const pipeline = [
            { $match: { userId: new ObjectId(userId) } },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    balance: 1,
                    rfidNumber: 1,
                    timestamp: 1,
                    username: "$user.name"
                }
            }
        ];

        const cardDetail = await collection.aggregate(pipeline).toArray();

        if (!cardDetail || cardDetail.length === 0) {
            return res.status(401).json({ success: false, message: "No request found" });
        }

        res.status(200).json({ cardDetail: cardDetail[0], success: true, message: "Request found Successfully" });

    } catch (error) {
        console.log("GetCardDetailUser.js error: ", error);
        res.status(500).json({ success: false, error: "something went wrong" });
    }
}

module.exports = { GetCardDetailUser };
