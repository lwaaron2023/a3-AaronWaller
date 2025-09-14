const express = require("express");
//makes a new router to handle the authentication
const router = express.Router();
module.exports = router;
//makes a new router to handle the orders






router.get('/', async (req, res) => {
    res.status(200).send('success');
})


