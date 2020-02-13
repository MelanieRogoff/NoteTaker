const express = require("express");
const path = require("path");
const fs = require("fs");
const jsonFile = require("./db"); //grabs db.json

//Set up Express App:
const app = express();
const PORT = 3000; 

//Sets up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static("public")); // need this in order to grab everything from the htmls

// Route for notes HTML
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

//API Routes
app.get("/api/notes", function(req, res) {
        fs.readFile('db.json', 'utf-8', (err, json) => { //read db.json
                let obj = (json); 
                res.json(obj); //return ALL saved notes as JSON
        })
    })

app.post("/api/notes", function(req, res) {
    let idCount = 1; //create variable, set to 1 b/c if arraylength=0 the id will be 1
    if (jsonFile.length > 0) { //if db.json array is greater than 0 
        idCount = jsonFile.pop().id; //set idCount to last id grabbed -- MUST grab last one to change it dynamically
    }
    const newNotes = req.body //new note to save 
    fs.readFile('db.json', 'utf-8', (err, json) => { //read db.json
        const noteArray = JSON.parse(json);
        //newNotes is an object. Need to set id property by doing .id and then setting it to something
        newNotes.id = noteArray.length + 1; //Add 1 b/c it automatically was off by 1. This is how we create the id
        noteArray.push(newNotes); //Add it to db.json
        fs.writeFile('db.json', JSON.stringify(noteArray), (err) => {
            if (err) {
                throw err;
            } 
        })
        return res.json(noteArray); //return new note to client -- MAY NEED TO PUT BACK IN WRITEFILE
});
})

app.delete("/api/notes/:id", function(req, res) {
    const idGrab = req.params.id; // this gets query param containing the note id
    //2: To delete notes:
    fs.readFile('db.json', 'utf-8', (err, json) => { //read ALL notes from db.json
    //b. REMOVE note w/given ID-ensure ids corres w/array indexes. START AT 0. If id=the index, slice array AT that id and then we'll have the new values
        noteArray.slice(idGrab);
        //c. Then REWRITE the notes to db.json
        fs.writeFile('db.json', JSON.stringify(noteArray), (err) => {
            if (err) {
                throw err;
            }
            return res.json(noteArray);
        })
})
});

//Route for index.html -- put here b/c * prevents anything being read after it
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Start the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });