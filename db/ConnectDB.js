const { MongoClient } = require("mongodb");
require('dotenv').config();

async function connectDB() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to Database");
        const db = client.db("sps"); // Specify your database name
        return db; // Return the database instance
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
}

module.exports = connectDB;
