const express = require("express");
const crypto = require("crypto");
const MongoClient = require("mongodb").MongoClient;
const ServerApiVersion = require("mongodb").ServerApiVersion;
const router = express.Router();
module.exports = router;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(`mongodb+srv://${process.env.USR}:${process.env.PSS}@${process.env.HST}/?retryWrites=true&w=majority&appName=a3-AaronWaller`, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

router.get('/results', async (req, res) => {
    console.log(req.user)
    if(req.user){
        //gets orders pertaining to user
        findUser(req.user.username).then(user => {
            try{
                res.json(user);
            } catch(err) {
                res.status(500).send(err)
            }
        });
    }
    else{
        res.status(404).send("User not found");
    }
})


router.get('/', async (req, res) => {
    res.status(200).send('success');
})

//Finds a specified user in the database
const findUser = async (username) => {
    try {
        const collection = await client.db("a3-AaronWaller").collection("orders");
        // console.log(collection);
        const query = { username: `${username}` };
        // console.log(query);
        return await collection.find(query).toArray((err, result) => {
            if(err) console.log(err);
            else{
                return result;
            }
        });
    } catch (err){
        console.log(err);
    }
}