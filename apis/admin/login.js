
const jwt = require('jsonwebtoken'); 
const  connectDB  = require('../../db/ConnectDB');
async function adminLoginApi(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("admindata");

        const { email, password } = req.body;
        const admin = await collection.findOne({ email, password });

        if (!admin) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).json({ adminData: admin, token, success: true, message: "Login Successful" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Login Failed" });
    }
}

module.exports = { adminLoginApi };
