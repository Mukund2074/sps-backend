const connectDB = require('../../db/ConnectDB')

async function AdminSignupApi(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('admindata');
        const user = { fname, lname, email, mobile, password } = req.body;
        console.log(email);
        const userExist = await collection.findOne({ email });


        if (userExist) {
            return res.status(400).json({ message: "USER ALREADY FOUND" })

        }
        else {
            await collection.insertOne({
                fname,
                lname,
                email,
                mobile,
                password
            });

            return res.status(200).json({ userData: user, message: 'User Created Successfully ' });

        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { AdminSignupApi };