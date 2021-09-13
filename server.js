const express = require("express");
const path = require("path");
const Rollbar = require("rollbar"); // Capitalize because it's a class

let rollbar = new Rollbar({
    accessToken: "847d4e03790b41c88baadf5d1a6529f5",
    captureUncaught: true,
    captureUnhandledRejections: true
}) // Takes in an object

const students = []; // Add this next line last
const app = express();
app.use(express.json()); // This is why rollbar gives you error, put this last
app.use("/style", express.static("./public/styles.css")); // If anyone tries to load style, go to the static path instead

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    rollbar.info("html file served successfully!");
})

// Create post request
// app.post("/api/student", (req, res) => {
//     let {name} = req.body; // This needs to be let (used to be const)
//     name = name.trim();
//     students.push(name);

//     rollbar.log("Student added successfully", {author: "Jeddy", type: "Manual entry"})
//     res.status(200).send(students);
// })

// Additional post request
app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex(studentName=> studentName === name)

    if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('Student added successfully', {author: 'Scott', type: 'manual entry'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.error('No name given')
        res.status(400).send('must provide a name.')
    } else {
        rollbar.error('student already exists')
        res.status(400).send('that student already exists')
    }

})

const port = process.env.PORT || 4545;

// app.listen(4545, () => {
//     console.log("They're taking the Hobbits to 4545!")
// })

app.use(rollbar.errorHandler());

app.listen(port, () => {
    console.log(`They're taking the Hobbits to ${port}`)
})

// 1) After typing all the above, and in the HTML, visit localhost:4545

// git pull origin main --allow-unrelated-histories

// 2) After a successful build in Heroku, npm i rollbar and import it
// 3) Go to projects, "first project", tokens, create access token
// 4) Setup rollbar as such above