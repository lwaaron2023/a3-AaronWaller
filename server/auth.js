import express from "express";
import passport from "passport";
import Strategy from "passport-local";
import {client} from "../server.js"
//makes a new router to handle the authentication
export const router = express.Router();
//used to put string into decryptable format
const textDecoder = new TextDecoder();

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
router.post('/', (req, res) => {


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