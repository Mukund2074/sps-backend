const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://mukundhadiya96:muku2074mongo@mukundcluster.bohda.mongodb.net";
const client = new MongoClient(uri);

async function connectDB(){
    try {
        await client.connect();
        console.log("Connected to Database");
        const database = client.db("sps");
        return database;


    } catch (error) {
        console.log(error);
    }
}
// connectToMongodb();
module.exports = connectDB; 