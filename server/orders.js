import express from "express";
import {client} from "../server.js"

//makes a new router to handle the orders
export const router = express.Router();




//opens a connection and gets the database
async function connect() {
    // Connect the client to the server\t(optional starting in v4.7)
    try {
        await client.connect();
        return client.db("orders").collection("a3-AaronWaller");
    } catch (error) {
        console.log(error);
    }
}
//closes the connection
async function closeConnection(){
    try {
        await client.close();
    } catch(error) {
        console.log(error);
    }
}


router.get('/', async (req, res) => {
    res.status(200).send('success');
})


