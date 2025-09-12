import {router as orderRotuer} from "./server/orders.js"
import {router as loginRotuer} from "./server/login.js"
import express from "express";

const app = express();
const port = 3000 || process.env.PORT;

//Sets the app to be able to path from the server or client folders
app.use(express.static('server'));
app.use(express.static('client'));


//Allows the program to automatically parse json body
app.use(express.json())

//Tells the server to use the order router for order endpoint
app.use('/order', orderRotuer);
app.use('/login', loginRotuer);

//Sets up server to listen on specified port
app.listen(port, (err) => {
    if (err) console.log(err);
})



