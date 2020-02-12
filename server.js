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
        fs.readFile('db.json', (err, json) => { //read db.json
                let obj = (json); 
                res.json(obj); //return ALL saved notes as JSON
        })
    })

app.post("/api/notes", function(req, res) {
        let idCount = 1; //create variable, set it to 1 b/c if the arraylength=0 the id will be 1
        if (jsonFile.length > 0) { //check to see if db.json array is greater than 0 
        idCount = jsonFile.pop().id + 1; //if it is, set idCount to last id grabbed, then add 1 to it -- HAVE to grab last one to change it dynamically
        }
        const newNotes = req.body //new note to save 
        fs.readFile('db.json', (err, json) => { //read db.json
            const noteArray = JSON.parse(json);
            console.log(noteArray); //RN THIS PRINTS OUT EVERY OBJECT EXCEPT THE LAST ONE
            //Step A. make a key that's an id
            //Step B. assign it the value of the variable i made for the id

            noteArray.push(newNotes); //Step 4: Add it to db.json - CHECK IT WORKS
            fs.writeFile('db.json', JSON.stringify(noteArray), (err) => {
                if (err) {
                    throw err;
                } 
                return res.json(noteArray); //return the new note to client
            })
});
})

app.delete("/api/notes/:id", function(req, res) {
    //1. Code to receive query parameter containing ID of note to delete
    //2: To delete notes:
        fs.readFile('db.json', (err, json) => { //read ALL notes from db.json
        //b. Then REMOVE note w/given ID property
        //c. Then REWRITE the notes to db.json
})
});

//Route for index HTML -- put here because * prevents anything being read after it
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });