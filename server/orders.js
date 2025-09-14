const express = require("express");
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
    // console.log(req.user)
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
        // console.log(row);
        if(await deleteDocument(req.body.row)){
            res.status(200).send();
        }
        else{
            res.status(404).send("Document not found");
        }
    }catch(err){
        res.status(500).send(err)
    }

})
/*
Allows a client to modify a specified order
 */
router.put('/results', async (req, res) => {
    try{
        // console.log(row,data);
        if(await modifyDocument(req.body.row,req.user.username,req.body.data)){
            res.status(200).send();
        }
        else{
            res.status(404).send("Document not found");
        }
    }catch(err){
        res.status(500).send(err)
    }
})
/*
Allows a client to place an order
 */
router.post('/place', async (req, res) => {
    try{
        await addDocument(req.user.username,req.body);
        res.redirect("/main.html");
    }catch(err){
        console.log(err);
        res.redirect(500, "/main.html")
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
const modifyDocument = async (id,user,data)=>{
    const update = {
        $set: {
            username: user,
            firstName: data['firstName'],
            lastName: data['lastName'],
            address: data['address'],
            shirts: data['shirts'],
            jackets: data['jackets'],
            hats: data['hats'],
            totalPrice: data['shirts'] * 15 + data['jackets'] * 35 + data['hats'] * 5
        }
    }
    const query = { _id: new ObjectId(id) };
    try{
        const collection = client.db("a3-AaronWaller").collection("orders");
        await collection.updateOne(query,update,{});
    } catch(err){
        console.log(err);
    }
}
//Adds the document to the database
const addDocument = async (user, data)=>{
    const record = {
        username: user,
        firstName: data['firstName'],
        lastName: data['lastName'],
        address: data['address'],
        shirts: data['shirts'],
        jackets: data['jackets'],
        hats: data['hats'],
        totalPrice: data['shirts'] * 15 + data['jackets'] * 35 + data['hats'] * 5
    }
    console.log(record);
    try{
        const collection = client.db("a3-AaronWaller").collection("orders");
        await collection.insertOne(record);
    } catch(err){
        console.log(err);
    }

}