const express = require("express");
const crypto = require("crypto");
const client = require("../server.js");
//makes a new router to handle the authentication
const router = express.Router();
module.exports = router;
//used to put string into decryptable format

