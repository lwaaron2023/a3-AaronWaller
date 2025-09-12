import express from "express";
import {MongoClient, ServerApiVersion} from "mongodb";
//makes a new router to handle the orders
export const router = express.Router();


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
console.log(`${process.env.USR}:${process.env.PSS}:${process.env.HST}`)
const client = new MongoClient(`mongodb+srv://${process.env.USR}:${process.env.PSS}@${process.env.HST}/?retryWrites=true&w=majority&appName=a3-AaronWaller`, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

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


