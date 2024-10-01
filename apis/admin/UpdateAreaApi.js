const { ObjectId } = require("mongodb");
const connectDB = require("../../db/ConnectDB");

async function UpdateAreaApi(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('Area');

        const { _id, Name, Locality, Zipcode, Reserved, Genral } = req.body;

        if (!_id) {
            return res.status(400).json({ success: false, message: "ID is required." });
        }

        const updatedFields = {};

        if (Name) updatedFields.Name = Name;
        if (Locality) updatedFields.Locality = Locality;
        if (Zipcode) updatedFields.Zipcode = Zipcode;
        if (Reserved) updatedFields.Reserved = Reserved;
        if (Genral) updatedFields.Genral = Genral;

        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ success: false, message: "No fields to update." });
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(_id) },
            { $set: updatedFields }
        );

        if (result.modifiedCount === 0) {
            return res.status(200).json({ success: true, message: "No changes made." });
        }

        return res.status(200).json({ success: true, message: "Area details updated successfully." });
    } catch (error) {
        console.error("Edit Area Failed:", error);
        return res.status(500).json({ success: false, message: "Error updating area." });
    }
}

module.exports = { UpdateAreaApi };
