const express = require('express');
const jwt = require('jsonwebtoken'); // Don't forget to import jwt
const { adminLoginApi } = require('./login');
const { AddSlots } = require('./Addslot');
const { ManageAreaApi } = require('./ManageAreaApi');
const { AdmindataApi } = require('./AdmindataApi');
const { DeleteArea } = require('./DeleteAreaApi');
const { UpdateAreaApi } = require('./UpdateAreaApi');
const { BookingApi } = require('./bookingapi');
const { TotaldeviceDataApi } = require('./TotalDeviceDataApi');
const { GetPendingCardRequest } = require('./getPendingCardRequest');
const { UserDataApi } = require('./UserDataApi');
const { GetFeedback } = require('./getFeedback');
const { GetComplaint } = require('./getComplaints');
const { ApproveCardRequest } = require('./approveCardRequest');
const { DeleteAdmin } = require('./DeleteAdminApi');
const { DeleteUser } = require('./DeleteUserApi');
const { sendEmailWithSMTP } = require('./forgotPasswordsmtp');
const { DeleteRfidRequestApi } = require('./DeleteRfidRequestApi');
const { getUserInfo } = require('./GetUserDetail');
const { GetRfidStore } = require('./GetRfidStore');
const { GetCardDetailsAdmin } = require('./GetCardDetailsAdmin');
require('dotenv').config();

const router = express.Router();

router.post('/adminlogin', adminLoginApi);

// Middleware for JWT authentication
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send('Access denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};

// Protected Routes
router.use(authMiddleware);

router.post('/addslot', AddSlots); 
router.get("/manageareaapi", ManageAreaApi); 
router.get('/admindata', AdmindataApi);
router.delete('/deletearea/:id', DeleteArea);
router.put('/updatearea/:id', UpdateAreaApi);
router.get('/booking', BookingApi);
router.get('/totaldevice', TotaldeviceDataApi);
router.get('/getPendingCardRequest', GetPendingCardRequest);
router.get('/userdata', UserDataApi);
router.get('/getfeedback', GetFeedback);
router.get('/complain', GetComplaint);
router.post('/approveCardRequest', ApproveCardRequest);
router.delete('/deleteAdmin/:id', DeleteAdmin);
router.delete('/deleteuser/:id', DeleteUser);
router.post('/forgotpassword', sendEmailWithSMTP);
router.delete('/deleterfidrequest/:id', DeleteRfidRequestApi);
router.get('/admininfo', getUserInfo);
router.get('/rfidstore' , GetRfidStore);
router.get('/getcardDetails/:id' , GetCardDetailsAdmin);

// Default response
router.get('/', (req, res) => {
    res.send('Hello World! This is the backend created by Mukund!');
});

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = { router, authMiddleware };
