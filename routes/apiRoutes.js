
// Load Data //
// these are the functions that links our routes to data sources //

var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));;
const fs = require("fs");

// Routing //

module.exports = function (app) {

// added the API Get requests function //

    app.get("/api/notes", function (req, res) {
      res.json(data);
    });


// when users visit the page they are shown a JSON of
// the data in thr table. //


    app.get("/api/notes/:id", function (req, res) {
      res.json(data[Number(req.params.id)]);
    });


// 

app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    let uniqueId = data.length.toString();
    console.log(uniqueId);
    newNote.id = uniqueId;

// pushed new notes ine note file //
    data.push(newNote);

// writting the notes data to the selected file //
    fs.writeFileSync("./db/db.json", JSON.stringify(data), function (err) {
      if (err) throw err;
    });
// sending the response //
    res.json(data);
  });


// this is the Bonus part //
// deleting the notes from the saved notes //
// API request for deleting //

  app.delete("/api/notes/:id", function (req, res) {
    let noteId = req.params.id;
    let newId = 0;

// console log the deleted note id as (noteID) //
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