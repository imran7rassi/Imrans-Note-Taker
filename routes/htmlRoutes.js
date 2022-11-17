
// Load Data //
// these are the functions that links our routes to data sources //

const path = require('path');


// routing
module.exports = (app) => {

  // creating routes
  
  // this get returns the notes.html file //

  app.get('/notes', (req, res) => {

    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  // this get returns the index.html file.
  app.get('*', (req, res) => {

    res.sendFile(path.join(__dirname, '../public/index.html'));

  })
  
};