const connectDB = require("./db/dbConnect");
const express = require('express');
const cors = require("cors");
const session = require("express-session");

// Import API handlers
// User APIs
const { AddDevice } = require("./apis/user/dummy2");
const { AddSensorData } = require("./apis/dummyAddData");
const { BookOnlineSlot } = require("./apis/user/bookOnlineSlot");
const { ApplyForCard } = require("./apis/user/ApplyForCard");
const { GetCardDetailUser } = require("./apis/user/getCardDetail");
const { GetCurrentRfidBooking } = require("./apis/user/getCurruntBooking");
const { GetAreas } = require("./apis/user/getAreaLocation");
const { AddFeedback } = require("./apis/user/addFeedback");
const { AddComplaint } = require("./apis/user/addComplaint");
const { RechargeCard } = require("./apis/user/rechargeCard");
const { UserLoginApi } = require('./apis/user/login');
const { UserLogout } = require('./apis/user/logout');
const { UserSignUpApi } = require('./apis/user/signup');
const { UserSession } = require('./apis/user/session');
const { PaymentApi } = require('./apis/user/PaymentApi');

// Admin APIs
const { AddSlots } = require('./apis/admin/Addslot');
const { ManageAreaApi } = require('./apis/admin/ManageAreaApi');
const { AdmindataApi } = require('./apis/admin/AdmindataApi');
const { DeleteArea } = require('./apis/admin/DeleteAreaApi');
const { UpdateAreaApi } = require('./apis/admin/UpdateAreaApi');
const { BookingApi } = require('./apis/admin/bookingapi');
const { TotaldeviceDataApi } = require('./apis/admin/TotalDeviceDataApi');
const { UserDataApi } = require('./apis/admin/UserDataApi');
const { DeleteAdmin } = require('./apis/admin/DeleteAdminApi');
const { DeleteUser } = require("./apis/admin/DeleteUserApi");
const { AdminLogoutApi } = require('./apis/admin/LogoutApi');
const { sendEmailWithSMTP } = require('./apis/admin/forgotPasswordsmtp');
const { AdminSignupApi } = require('./apis/admin/signup');
const { AdminSession } = require('./apis/admin/session');
const { GetPendingCardRequest } = require('./apis/admin/getPendingCardRequest');
const { GetFeedback } = require('./apis/admin/getFeedback');
const { GetComplaint } = require('./apis/admin/getComplaints');
const { ApproveCardRequest } = require('./apis/admin/approveCardRequest');
const { GetOnlineBooking } = require('./apis/user/getOnlineBookingApi');
const { DeleteRfidRequestApi } = require('./apis/admin/DeleteRfidRequestApi');
const { adminLoginApi } = require('./apis/admin/login')

// Create Express app
const app = express();
const port = process.env.PORT || 8000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS configuration
app.use(cors({
    origin: ["http://localhost:3000", "https://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Configure express-session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Define API routes
// Common APIs
app.post('/addDevice', AddDevice);
app.post('/addSensorData', AddSensorData);

// User APIs
app.post('/user/userlogin', UserLoginApi);
app.post('/user/usersignup', UserSignUpApi);
app.post('/user/usersession', UserSession);
app.post('/user/applyForCard', ApplyForCard);
app.post('/user/getCardDetail', GetCardDetailUser);
app.post('/user/payment', PaymentApi);
app.post('/user/rechargeCard', RechargeCard);
app.post('/user/addComplaint', AddComplaint);
app.post('/user/addFeedback', AddFeedback);
app.post('/user/bookOnlineSlot', BookOnlineSlot);
app.post('/user/getCurruntRfidBooking', GetCurrentRfidBooking);
app.get('/user/getonlinebooking', GetOnlineBooking);
app.get('/user/getAreas', GetAreas);
app.post('/user/userlogout', UserLogout);

// Admin APIs
app.post('/admin/adminsignup', AdminSignupApi);
app.post('/admin/adminlogin', adminLoginApi);
app.post('/admin/adminsession', AdminSession);
app.post("/admin/addslot", AddSlots);
app.post("/admin/manageareaapi", ManageAreaApi);
app.post('/admin/admindata', AdmindataApi);
app.post('/admin/deletearea', DeleteArea);
app.post('/admin/updatearea', UpdateAreaApi);
app.get('/admin/booking', BookingApi);
app.post('/admin/totaldevice', TotaldeviceDataApi);
app.post('/admin/getPendingCardRequest', GetPendingCardRequest);
app.post('/admin/userdata', UserDataApi);
app.post('/admin/getfeedback', GetFeedback);
app.post('/admin/complain', GetComplaint);
app.post('/admin/approveCardRequest', ApproveCardRequest);
app.post('/admin/deleteAdmin', DeleteAdmin);
app.post('/admin/deleteuser', DeleteUser);
app.post('/admin/forgotpassword', sendEmailWithSMTP);
app.post('/admin/adminlogout', AdminLogoutApi);
app.post('/admin/deleterfidrequest', DeleteRfidRequestApi);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;

// Start the server for local development
if (require.main === module) {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
}
