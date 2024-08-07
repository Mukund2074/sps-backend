const connectDB = require("../../db/dbConnect");

async function adminLoginApi(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("admindata");

        const { email, password, role } = req.body;
        const admin = await collection.findOne({ email, password });

        if (!admin) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid adminname or password" });
        }

        // session creation
        req.session.admin = { session: admin, isAuth: true };
        const adminDatas = req.session.admin;

        res
            .status(200)
            .json({ adminData: adminDatas, success: true, message: "Login Successful" });
    } catch (error) {
        console.log("login.js error: ", error);
        res.status(500).json({ success: false, error: "Login Failed" });
    }
}

module.exports = { adminLoginApi };
