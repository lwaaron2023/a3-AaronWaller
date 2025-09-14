const orderRotuer = require("./server/orders.js")
const loginRotuer = require("./server/auth.js")
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const ServerApiVersion = require("mongodb").ServerApiVersion;

const app = express();
const port = 3000 || process.env.PORT;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(`mongodb+srv://${process.env.USR}:${process.env.PSS}@${process.env.HST}/?retryWrites=true&w=majority&appName=a3-AaronWaller`, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

module.exports = client;

//Sets the app to be able to path from the server or client folders
app.use(express.static('server'));
app.use(express.static('client'));
//Sets up session logging
app.use(cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET],
    maxAge: 60 * 60 * 1000
}))
//Allows the program to automatically parse json body
app.use(express.json())
app.use(express.raw())
//Tells the server to use the order router for order endpoint
app.use('/order', orderRotuer);
app.use('/', loginRotuer);

//Sets up server to listen on specified port
app.listen(port, (err) => {
    if (err) console.log(err);
})






