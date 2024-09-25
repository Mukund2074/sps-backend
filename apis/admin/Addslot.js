const connectDB = require('../../db/ConnectDB');

async function AddSlots(req, res) {

    try {
        const db = await connectDB();
        const collection = db.collection('Area');
        const { Locality, Name, Zipcode, Online, Rfid, availableOnlineSlot = Online, availablerfidSlot = Rfid } = req.body;
        const areaExist = await collection.findOne({ Name });
        if (areaExist) {
            return res.status(400).json;
        }
        await collection.insertOne({
            Locality,
            Name,
            Zipcode,
            Online,
            Rfid,
            availableOnlineSlot,
            availablerfidSlot
        });

        return res.status(200).json({ message: 'Area Added Successfully ' });

    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { AddSlots };