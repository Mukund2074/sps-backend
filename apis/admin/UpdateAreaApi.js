const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbconnect");

async function UpdateAreaApi(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('Area');

        // if (!req.session.user) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }
        // const userId = req.session.user.session._id;
        // console.log(userId);

        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }


        const { _id, Name, Locality, Zipcode , Reserved , Genral } = req.body;
        //const pImg = req.file ? req.file.filename : null;

        if (!_id && !Name && !Locality && !Zipcode && !Reserved && !Genral)  {
            return res.status(400).json({ success: false, message: "No fields to update." });
        }

        const updatedFields = {};

        if (Name) {
            updatedFields.Name = Name;
        }
        if (Locality) {
            updatedFields.Locality = Locality;
        }
        if (Zipcode) {
            updatedFields.Zipcode = Zipcode;
        }
        if (Reserved) {
            updatedFields.Reserved = Reserved;
        }

        if (Genral) {
            updatedFields.Genral = Genral;
        }
 


        const result = await collection.updateOne(
            {
                _id: new ObjectId(_id),
                //uid: ObjectId.createFromHexString(userId)
            },
            { $set: updatedFields }
        );

        if (result.modifiedCount === 0) {
            return res.status(402).json({ success: false, message: "No Changes Done" });
        }

        return res.status(200).json({ success: true, message: "Area details updated successfully." });
    } catch (error) {
        console.error("Edit Area Failed:", error);
        return res.status(500).json({ success: false, error: "Edit Ara Failed" });
    }
}

module.exports = { UpdateAreaApi };
