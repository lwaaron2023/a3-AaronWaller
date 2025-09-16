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
    failureRedirect: "/failure",
    successRedirect: "/main",
    failureMessage: true
}))
/*
Controls access to index.html by making sure requester has session
 */
router.get("/main",(req,res,next)=>{
    // console.log(`user ${req.user}`);
    if(!req.user) {
        res.render("auth.pug", {title:'Login'});
    }
    else{
        res.render("main.pug", {title:'Gompei Gear'})
    }
})

/*
Sets the get for the index.html to point to the login screen
 */
router.get("/failure",(req,res,next)=>{
    res.render("auth.pug", {message:'Login failed, incorrect username or password'})
})


/*
Sets the get for the index.html to point to the login screen
 */
router.get("/",(req,res,next)=>{
    res.render("auth.pug", {title:'Login'})
})
/*
Sets the get for the index.html to point to the login screen
 */
router.get("/index.html",(req,res,next)=>{
    res.render("auth.pug", {title:'Login'})
})
/*
Controls access to order.html by making sure requester has session
 */
router.get("/order",(req,res,next)=>{
    // console.log(`user ${req.user}`);
    if(!req.user) {
        res.render("auth.pug", {title:'Login'});
    }
    else{
        res.render("order.pug", {title:'Orders'});
    }
})
/*
Allows users to sign out
 */
router.post("/logout", (req,res,next)=>{
    console.log("user logged out");
    req.logout(function(err){
        if(err) return next(err);
        res.render("auth.pug", {message:'Log out successful'});
    });
})
/*
Allows user to create account
 */
router.post('/signup', async function(req, res, next) {
    const alreadyExists = await findUser(req.body.username)
    const hash = crypto.createHash("md5", process.env.SALT).update(req.body.password).digest("hex");
    // console.log(alreadyExists);
    if(!alreadyExists){
        try{
            if(!await createUser(req.body.username,hash)['insertId']){
                console.log("created new user")
                res.render("auth.pug", {message:'Successfully created new user'});
            }
            else{
                console.log("failed to create new user")
                res.render("auth.pug", {message:'Failed to create new user due to server error'});
            }
        } catch (err){
            console.log(err)
            res.render("auth.pug", {message:'Failed to create new user due to server error'});
        }
    }
    else{
        console.log(`account already exists ${req.body.username}`);
        res.render("auth.pug", {message:'Account already exists'});
    }
    // crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    //     if (err) { return next(err); }
    //     db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
    //         req.body.username,
    //         hashedPassword,
    //         salt
    //     ], function(err) {
    //         if (err) { return next(err); }
    //         var user = {
    //             id: this.lastID,
    //             username: req.body.username
    //         };
    //         req.login(user, function(err) {
    //             if (err) { return next(err); }
    //             res.redirect('/');
    //         });
    //     });
    // });
});

/*
Sets up the passport for the steps after it receives and deciphers the data
 */
passport.use('local', new LocalStrategy(function verify(username, password, cb) {
     findUser(username).then(user => {
         // console.log(user)
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
Attempts to add user to database
 */
const createUser = async (username, password) => {
    try {
        const collection = await client.db("a3-AaronWaller").collection("login");
        // console.log(collection);
        const query = { username: `${username}`,
        hashed_password: `${password}` };
        // console.log(query);

        return await collection.insertOne(query);
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