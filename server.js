const express = require("express");
const path = require("path");
const fs = require("fs");
const jsonFile = require("./db"); //grabs db.json

//Set up Express App:
const app = express();
const PORT = process.env.PORT || 3000;

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
                res.json(JSON.parse(obj)); //return ALL saved notes as JSON
        })
    })

app.post("/api/notes", function(req, res) {
    let idCount = 1; //create variable, set to 1 b/c if arraylength=0 the id will be 1
    if (jsonFile.length > 0) { //if db.json array is greater than 0 
        idCount = jsonFile.pop().id; //set idCount to last id grabbed - get last one (pop()) to change it dynamically
    }
    const newNotes = req.body //new note to save 
    fs.readFile('db.json', 'utf-8', (err, json) => { //read db.json
        const noteArray = JSON.parse(json);
        //newNotes=object. Need to set id property by doing .id, then setting it to a value. 
        newNotes.id = noteArray.length + 1; //array.length+1 b/c it=naturally off by 1. Makes id correspond to index
        noteArray.push(newNotes); //Add to db.json
        fs.writeFile('db.json', JSON.stringify(noteArray), (err) => {
            if (err) {
                throw err;
            } 
            return res.json(noteArray); //return new note to client 
        })
});
})

app.delete("/api/notes/:id", function(req, res, json) {
    fs.readFile('db.json', 'utf-8', (err, json) => { //read ALL notes from db.json
    const newNote = JSON.parse(json);  //make a newNote variable w/the JSON data
    for (let i = 0; i < newNote.length; i++) { //loop through the array of notes
        if (newNote[i].id == req.params.id) { //for notes w/ids that match req.params.id
            newNote.splice(i, 1); //remove the specified note (have to do i for index, and 1 to signify we delete only 1 entry)
        }
    }
        fs.writeFile('db.json', JSON.stringify(newNote), (err) => { //Rewrite notes minus deleted notes to db.json
            if (err) {
                throw err;
            }
            return res.json(JSON.stringify(newNote));
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