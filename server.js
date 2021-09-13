const express = require("express");
const path = require("path");
const Rollbar = require("rollbar"); // Capitalize because it's a class

let rollbar = new Rollbar({
    accessToken: "847d4e03790b41c88baadf5d1a6529f5",
    captureUncaught: true,
    captureUnhandledRejections: true
}) // Takes in an object

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    rollbar.info("html file served successfully!");
})

const port = process.env.PORT || 4545;

// app.listen(4545, () => {
//     console.log("They're taking the Hobbits to 4545!")
// })

app.listen(port, () => {
    console.log(`They're taking the Hobbits to ${port}`)
})

// 1) After typing all the above, and in the HTML, visit localhost:4545

// git pull origin main --allow-unrelated-histories

// 2) After a successful build in Heroku, npm i rollbar and import it
// 3) Go to projects, "first project", tokens, create access token