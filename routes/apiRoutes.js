
// Load Data //
// these are the functions that links our routes to data sources //


const db = require("../db/db.json");
const fs = require("fs");
var path = require("path");

// Routing //

module.exports = function (app) {

    const objectsList = JSON.parse(fs.readFileSync("./db/db.json", "utf8", (err) => {
        if (err) throw err;
      }));

// added the API Get requests function //

    app.get("/api/notes", function (req, res) {

     return res.json(data);
    });


// when users visit the page they are shown a JSON of
// the data in thr table. //



// posting the api notes should receive 
// a new note to save on the request body //

app.post("/api/notes", function (req, res) {
    let newNote = { title: req.body.title, text: req.body.text }; // New object built with 
    newNote.id = objectsList.length.toString();

// pushed new notes ine note file //
    objectsList.push(newNote);

// writting the notes data to the selected file //
    fs.writeFileSync("./db/db.json", JSON.stringify(data), function (err) {
      if (err) throw err;
    });
// sending the response //
    res.json(objectsList);
  });


// this is the Bonus part //
// deleting the notes from the saved notes //
// API request for deleting //

  app.delete("/api/notes/:id", function (req, res) {
    let idSelected = JSON.parse(req.params.id);
    let newId = 0;

// console log the deleted note id as (noteID) //
// and filtering the data //

    console.log(`Deleting note with id ${noteId}`);
    data = data.filter((currentNote) => {

// returnning back //
      return currentNote.id != noteId;

    });


    for (currentNote of data) {
      currentNote.id = newId.toString();
      newId++;
    }

    // writing the new data to the file //

    fs.writeFileSync("./db/db.json", JSON.stringify(data));
    res.json(data);
  });
};