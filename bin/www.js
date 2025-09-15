console.log(process.cwd())

const app = require("../app.js").app
const port = process.env.PORT || 3000;

//Sets up server to listen on specified port
app.listen(port, (err) => {
    if (err) console.log(err);
})