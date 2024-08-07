async function AdminSession(req, res) {
    try {

        const adminDatas = req.session.admin;

        if (!adminDatas) {
            return res.status(401).json({ message: "No sesssion created!" });
        } else {
            res.status(200)
                .json({ sessionData: adminDatas, success: true, message: "session got Successful" });

        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {AdminSession}