const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
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