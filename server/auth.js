import express from "express";
import crypto from "crypto";
import {client} from "../server.js"
//makes a new router to handle the authentication
export const router = express.Router();
//used to put string into decryptable format
const textDecoder = new TextDecoder();
const textEncoder = new TextEncoder();
//generates the key pairs for the use in encryption
const generateKeyPair = async ()=> {
    return await crypto.subtle.generateKey({
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: {name: "SHA-256"}
    }, true, ["encrypt", "decrypt"])
}
let publicKey;
let privateKey;
//generates the key pairs for the use in encryption
generateKeyPair().then((pair)=>{
     privateKey = pair.privateKey;
     publicKey = pair.publicKey;
})

//Sends the requester the public key for the encryption
router.get('/publicKey', (req, res) => {
    if(publicKey instanceof CryptoKey) {
        crypto.subtle.exportKey("jwk", publicKey).then((publicKey)=>{
            res.json(publicKey);
        })
    }
    else{
        res.status(404).send('Not found');
    }
})
/*
Sends the login page to the client
 */
router.get('/login', (req, res) => {
    res.sendFile('/login.html', {root: "./public"}, (err)=>{
        if(err) console.log(err);
    })
})
/*
Sends the login.js file to the client
 */
router.get('/login.js', (req, res) => {
    res.sendFile('/login.js', {root: "./public"}, (err)=>{
        if(err) console.log(err);
    })
})
/*
Decrypts and processes the submitted username and passwords, using a E2EE method: RSA-OAEP
 */
router.post('/', async (req, res) => {
    const info = await decryptRequest(req);
    if(info){
        //info is in database
        console.log(`username: ${info.username}, password: ${info.password}`);
        const user= await findUser(info.username)
        if(user){
            // user is in database
            // checks to see if the password matches and hands off
            await checkPassword(info.password, user['hashed_password']);
        }
        else{
            res.text = 'Wrong Username or Password';
            res.status(400).redirect('/auth/login');
        }
    }
    else{
        res.status(500).send('Something went wrong');
    }
})
/*
Decrypts the stored information from the request
 */
const decryptRequest = async (req)=> {
    if(privateKey instanceof CryptoKey) {
        //checks to make sure privateKey is initialized
        try {
            // console.log("attempting to assemble data");
            // console.log(`body: ${req.body} isBuffer: ${req.body instanceof Buffer}`)
            const decrypt = await crypto.subtle.decrypt({"name":"RSA-OAEP"}, privateKey, req.body)
            //takes decrypted bytes and converts them back to string form
            const str = textDecoder.decode(decrypt);
            //splits the string into the username and password components
            const temp = str.split("/");
            return{
                'username': temp[0],
                'password': temp[1],
            }
        }catch(err){
            console.log(err);

        }
    }
}
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
Hashes the password that was supplied and then checks it against the hashed password
 */
const checkPassword = async (password, compare) => {
    try {
        await crypto.pbkdf2(password, process.env.SALT,100000,64, 'sha256', function (err, hashedPassword) {
            console.log(`password ${hashedPassword.toString('base64')} password ${compare} equal? ${hashedPassword.toString('base64')===compare}`);
            (hashedPassword.toString('base64')===compare);
        })
    } catch(err){
        console.log(err);
    }

}