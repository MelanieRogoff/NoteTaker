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
    res.sendFile(path.join(__dirname, "develop/public/notes.html"));
  });

//Route for index HTML
app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "develop/public/index.html"));
});
  
//API Routes

app.get("/api/notes", function(req, res) {
    //Should read db.json & return ALL saved notes as JSON
});

app.post("/api/notes", function(req, res) {
    //1: Receive new note to save on req body
    //2: Add it to db.json
    //3: Return the new note to client
})

app.delete("/api/notes/:id", function(req, res) {
    //1. Should receive query parameter containing ID of note to delete
    //2: Give each note a unique ID when saved
    //3: To delete notes, I need to read ALL notes from db.json
        //a. Then I need to REMOVE note w/given ID property
        //b. Then I need to REWRITE the notes to db.json
} )


// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });