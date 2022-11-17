
// Load Data //
// these are the functions that links our routes to data sources //

const path = require('path');
const fs = require('fs')

// that's the npm package linked
// to use the uniqid
// But at first you have to do the "npm install uniqid"//
// To run the uniqid

var uniqid = require('uniqid');


// routing
module.exports = (app) => {

  // the get api added to read the db.json
  // and after reading return the notes to JSON //

  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });

// posting the api notes should receive 
// a new note to save on the request body //

  app.post('/api/notes', (req, res) => {
    let db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    res.json(db);

    let userNote = {
      title: req.body.title,
      text: req.body.text,
// that is for creating an uniqid //

      id: uniqid(),

    };

    db.push(userNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);

  });


// this is the Bonus part //
// deleting the notes from the saved notes //
// API request for deleting //

  app.delete('/api/notes/:id', (req, res) => {
  
    let db = JSON.parse(fs.readFileSync('db/db.json'))
  
    let deleteNotes = db.filter(item => item.id !== req.params.id);
  
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes);
    
  })
};
