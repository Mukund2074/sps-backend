const express = require('express');
const jwt = require('jsonwebtoken'); // Don't forget to import jwt
const { BookOnlineApi } = require("./BookOnlineApi");
const { ApplyForCard } = require("./ApplyForCard");
const { GetCurrentRfidBooking } = require("./getCurruntBooking");
const { GetAreas } = require("./getAreaLocation");
const { AddFeedback } = require("./addFeedback");
const { AddComplaint } = require("./addComplaint");
const { RechargeCard } = require("./rechargeCard");
const { UserLoginApi } = require('./login');
const { UserSignUpApi } = require('./signup');
const { PaymentApi } = require('./PaymentApi');
const { GetOnlineBookingApi } = require('./getOnlineBookingApi');
const { GetCardDetailsUser } = require('./GetCardDetailsUser');

require('dotenv').config();

const router1 = express.Router();

router1.post('/userlogin', UserLoginApi);
router1.post('/usersignup', UserSignUpApi);



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
router1.use(authMiddleware);
router1.get('/getOnlineBookingApi/:id', GetOnlineBookingApi);
router1.post('/applyForCard', ApplyForCard);
router1.post('/payment', PaymentApi);
router1.post('/rechargeCard', RechargeCard);
router1.post('/addComplaint', AddComplaint);
router1.post('/addFeedback', AddFeedback);
router1.post('/bookOnlineSlot', BookOnlineApi);
router1.get('/getCurruntRfidBooking/:id', GetCurrentRfidBooking);
router1.get('/getAreas', GetAreas);
router1.get('/getcardDetailsUser/:id', GetCardDetailsUser)




// Default response
router1.get('/', (req, res) => {
    res.send('Hello World! This is the backend created by Mukund!');
});

// Error handling middleware
router1.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = { router1, authMiddleware };
