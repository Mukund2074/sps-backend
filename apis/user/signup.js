const connectDB = require("../../db/ConnectDB");

async function UserSignUpApi(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('userdata');

        const { name, email, phoneNo, password } = req.body;

        if (!name || !email || !phoneNo || !password) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        const userExist = await collection.findOne({ email });

        if (userExist) {
            return res
                .status(400)
                .json({ success: false, message: "Email Already Exist!" });
        }

        await collection.insertOne({
            name,
            email,
            phoneNo,
            password,
            hasCard: false,
            timestamp: new Date()
        });

        return res
            .status(201)
            .json({ success: true, message: "Registration Successful" });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Registration Failed" });
    }
}

module.exports = { UserSignUpApi };