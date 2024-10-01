const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require('./db/ConnectDB');
require('dotenv').config();

// Import API handlers (User and Admin APIs)
const { router } = require('./apis/admin/auth'); // Admin routes
const { router1 } = require('./apis/user/auth');

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


// Connect to database and start the server
connectDB()

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

// Admin routes using JWT
app.use('/admin', router); // Admin routes that use JWT for authentication
app.use('/user' , router1);

// Default response
app.get('/', (req, res) => {
    res.send('Hello World! This is the backend created by Mukund!');
});

app.use((err, req, res, next) => {
    console.error("Error Stack:", err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});


module.exports = app;
