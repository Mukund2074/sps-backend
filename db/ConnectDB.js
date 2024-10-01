const { MongoClient } = require("mongodb");
require('dotenv').config();

async function connectDB() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, {
        tls: true, 
        ssl: true, 
    });

    try {
        await client.connect();
        console.log("Connected to Database");
        const db = client.db("sps");
        return db; 
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    } 
}

module.exports = connectDB;
