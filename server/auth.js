const express = require("express");
const crypto = require("crypto");
const passport = require("passport");
const LocalStrategy = require("passport-local");
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


router.post("/login/password", passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/main.html",
}))

router.get("/main.html",(req,res,next)=>{
    console.log(`user ${req.user}`);
    if(!req.user) {
        res.redirect("/index.html");
    }
    else{
        res.sendFile("/index.html", {root: "./public"}, (err) => {
            console.log(err);
        });
    }
})

/*
Sets the get for the index.html to point to the login screen
 */
router.get("/",(req,res,next)=>{
    res.sendFile("/login.html", {root:"./public"}, (err)=>{
        console.log(err);
    });
})

/*
Sets the get for the index.html to point to the login screen
 */
router.get("/index.html",(req,res,next)=>{
    res.sendFile("/login.html", {root:"./public"}, (err)=>{
        console.log(err);
    });
})
/*
Allows users to sign out
 */
router.post("/logout", (req,res,next)=>{
    console.log("user logged out");
    req.logout(function(err){
        if(err) return next(err);
        res.redirect("/");
    });
})
/*
Sets up the passport for the steps after it receives and deciphers the data
 */
passport.use('local', new LocalStrategy(function verify(username, password, cb) {
     findUser(username).then(user => {
        if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }
        //generates an md5 hash for the password, then compares it
        const hash = crypto.createHash("md5", process.env.SALT).update(password).digest("hex");
        if(user.hashed_password !== hash) {
            // console.log(`Incorrect password. Expected:${user.hashed_password} with type ${typeof user.hashed_password} but received:${hash} with type ${typeof hash}`);
            return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, user);
    });
}))
/*
Attempts to retrieve user from database
 */
const findUser = async (username) => {
    try {
        const collection = await client.db("a3-AaronWaller").collection("login");
        // console.log(collection);
        const query = { username: `${username}` };
        // console.log(query);
        return await collection.findOne(query);
    } catch (err){
        console.log(err);
    }
}
/*
Used for storing user information for persistent logins
 */
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, username: user.username });
    });
});
/*
Used for deleting user information when they would log out
 */
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});