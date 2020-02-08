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
  





// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });