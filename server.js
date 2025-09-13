import {router as orderRotuer} from "./server/orders.js"
import {router as loginRotuer} from "./server/auth.js"
import {MongoClient, ServerApiVersion} from "mongodb";
import express from "express";

const app = express();
const port = 3000 || process.env.PORT;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(`mongodb+srv://${process.env.USR}:${process.env.PSS}@${process.env.HST}/?retryWrites=true&w=majority&appName=a3-AaronWaller`, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

//Sets the app to be able to path from the server or client folders
app.use(express.static('server'));
app.use(express.static('client'));


//Allows the program to automatically parse json body
app.use(express.json())
app.use(express.raw())
//Tells the server to use the order router for order endpoint
app.use('/order', orderRotuer);
app.use('/auth', loginRotuer);
app.use('/', (req, res)=>{
    try{
        //If the person is looking for the index.html, redirect them to the login page
        const url = req._parsedUrl.pathname;
        console.log(url);
        if(url === '/' || url =='/index.html'){
            res.redirect('/auth/login');
        }
    } catch (error){
        res.status(400).json(JSON.stringify({error: error}));
    }
})


//Sets up server to listen on specified port
app.listen(port, (err) => {
    if (err) console.log(err);
})






