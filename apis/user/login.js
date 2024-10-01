
const jwt = require('jsonwebtoken'); 
const  connectDB  = require('../../db/ConnectDB');
async function UserLoginApi(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("userdata");

        const { email, password } = req.body;
        const user = await collection.findOne({ email, password });

        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).json({ userData: user, token, success: true, message: "Login Successful" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Login Failed" });
    }
}

module.exports = { UserLoginApi };
