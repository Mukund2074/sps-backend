const connectDB = require('../../db/dbConnect');

async function AdminLoginApi(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('admindata');
        const { email, password } = req.body;
        const user = await collection.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid username or password" });
        } else {
            req.session.user = { session: user, isAuth: true };
            const userDatas = req.session.user;
            res.status(200).json({ userData: userDatas, success: true, message: "LOGIN SUCCESSFULLY" });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: "Login Failed" });
    }
}

module.exports = { AdminLoginApi };
 