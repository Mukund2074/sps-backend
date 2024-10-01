const { ObjectId } = require('mongodb');
const connectDB = require('../../db/ConnectDB');

async function ApproveCardRequest(req, res) {
    try {
        const db = await connectDB();
        const userCollection = db.collection('userdata');
        const rfidStoreCollection = db.collection('rfidStore');
        const cardRequestsCollection = db.collection('cardRequests');
        const cardAllotmentsCollection = db.collection('cardAllotments');

        const { requestId, cardNumber, balance } = req.body;

      

        // Step 1: Fetch the card request to get userId
        const cardRequest = await cardRequestsCollection.findOne({ _id: new ObjectId(requestId) });
        if (!cardRequest) {
            return res.status(404).send('Card request not found');
        }
 
        // Step 2: Fetch the user based on userId from the card request
        const user = await userCollection.findOne({ _id: cardRequest.userId });
        if (!user) {
            return res.status(404).send('User not found');
        }
   

        // Step 3: Fetch the RFID card
        const rfidCard = await rfidStoreCollection.findOne({ id: cardNumber });
        if (!rfidCard) {
            return res.status(404).send('RFID card not found');
        }
    

        // Create the allotment object
        const allotment = {
            userId: user._id,
            rfidId: rfidCard._id,
            balance: parseInt(balance) || 200,
            validity: rfidCard.validity,
            assignedAt: new Date(),
        };

        // Insert allotment and update collections
        const allotmentResult = await cardAllotmentsCollection.insertOne(allotment);

        await userCollection.updateOne(
            { _id: user._id },
            { $set: { hasCard: allotmentResult.insertedId } }
        );
        await rfidStoreCollection.updateOne(
            { id: cardNumber },
            { $set: { alloted: allotmentResult.insertedId } }
        );
        await cardRequestsCollection.updateOne(
            { _id: new ObjectId(requestId) },
            {
                $set: {
                    status: 'alloted',
                    allotmentId: allotmentResult.insertedId
                }
            }
        );

        res.status(201).send({ success: true, message: 'Card alloted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { ApproveCardRequest };