const express = require('express');
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const connectDB = require('./db/ConnectDB');
require('dotenv').config();

// Import API handlers (User and Admin APIs)
const { AddDevice } = require("./apis/user/dummy2");
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
const { GetOnlineBooking } = require('./apis/user/getOnlineBookingApi');
const { router } = require('./apis/admin/Auth'); // Admin routes

// Create Express app
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001", process.env.USER_SIDE, process.env.ADMIN_SIDE],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// Configure express-session middleware for user authentication
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
    name: 'sps-cookie',
}));

// Connect to database and start the server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error('Database connection error:', error);
});

// User routes with session
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

// Admin routes using JWT
app.use('/admin', router); // Admin routes that use JWT for authentication

// Default response
app.get('/', (req, res) => {
    res.send('Hello World! This is the backend created by Mukund!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
