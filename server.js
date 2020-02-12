const express = require("express");
const path = require("path");

//Set up Express App:
const app = express();
const PORT = 3000; 

//Sets up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// Route for notes HTML
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

//API Routes

app.get("/api/notes", function(req, res) {
        fs.readFile('db.json', (err, json) => { //read db.json
                let obj = (json); 
                res.json(obj); //return ALL saved notes as JSON
        })
    })

app.post("/api/notes", function(req, res) {
    //1. Enable save button
    //2. Give each note unique ID when saved
    //3: Receive new note to save on req body 
    //4: Add it to db.json
    //5: Return the new note to client
});

app.delete("/api/notes/:id", function(req, res) {
    //1. Code to receive query parameter containing ID of note to delete
    //2: To delete notes:
        fs.readFile('db.json', (err, json) => { //Read ALL notes from db.json
        //b. Then REMOVE note w/given ID property
        //c. Then REWRITE the notes to db.json
})
});

//Route for index HTML -- put down here  because * prevents anything being read after it
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });