const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.listen(4545, () => {
    console.log("They're taking the Hobbits to 4545!")
})

// 1) After typing all the above, and in the HTML, visit localhost:4545