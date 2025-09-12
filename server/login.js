import express from "express";
import passport from "passport";
import Strategy from "passport-local";
import crypto from "crypto";
import {client} from "../server.js"
//makes a new router to handle the authentication
export const router = express.Router();


const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa',{
    modulusLength: 2048,
})

router.get('/publicKey', (req, res) => {

})

router.get('/login', (req, res) => {
    res.sendFile('/public/login.html', {root: "."}, (err)=>{
        if(err) console.log(err);
        else console.log("sent file login.html")
    })
})


passport.use(new Strategy(
    (username, password, done)=>{
        User.findOne({username: username},)
    }
))
