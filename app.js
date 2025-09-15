const orderRotuer = require("./routes/orders.js")
const loginRotuer = require("./routes/auth.js")
const express = require('express');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const MongoClient = require("mongodb").MongoClient;
const ServerApiVersion = require("mongodb").ServerApiVersion;
const port = process.env.PORT || 3000;
const path = require("path");
const client = new MongoClient(`mongodb+srv://${process.env.USR}:${process.env.PSS}@${process.env.HST}/?retryWrites=true&w=majority&appName=a3-AaronWaller`, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



const session = require('express-session');
const bodyParser = require('body-parser');


const app = express();
app.set('view engine', 'pug');
app.set('views', './views');
//Setting up various middleware for use later
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false, store: new MongoStore({client: client}) }));
app.use(passport.initialize());
app.use(passport.session('session'));

//Sets the app to be able to path from the public
app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public/javascripts')));
//Allows the program to automatically parse json body
app.use(express.json())

//Tells the server to use the order router for order endpoint
app.use('/order', orderRotuer);
app.use('/', loginRotuer);


//Sets up server to listen on specified port
app.listen(port, (err) => {
    if (err) console.log(err);
})




