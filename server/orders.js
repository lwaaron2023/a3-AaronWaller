const express = require("express");
const crypto = require("crypto");
const {ObjectId} = require("mongodb");
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
/*
Allows for the client to request the orders pertaining to the current user
 */
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
/*
Allows client to delete a specified order
 */
router.delete('/results', async (req, res) => {
    try{
        const row = req.body.row;
        // console.log(row);
        await deleteDocument(row);
        res.status(200).send();
    }catch(err){
        res.status(500).send(err)
    }

})
/*
Allows a client to modify a specified order
 */
router.put('/results', async (req, res) => {
    try{
        const row = req.body.row;
        const data = req.body.data;
        console.log(row,data);
        if(await modifyDocument(row,data)){
            res.status(200).send();
        }
        else{
            res.status(404).send("Document not found");
        }
    }catch(err){
        res.status(500).send(err)
    }
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
//Finds a specified document and deletes it
const deleteDocument = async (id)=>{
    try{
        const collection = client.db("a3-AaronWaller").collection("orders");
        const query = { _id: new ObjectId(id) };
        return (await collection.deleteOne(query)).deletedCount === 1;
    } catch(err){
        console.log(err);
        return false;
    }
}
//Finds a specified document and modifies it to store the new data
const modifyDocument = async (id,data)=>{

}