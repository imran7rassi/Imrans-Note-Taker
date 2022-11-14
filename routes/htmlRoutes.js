
// Load Data //
// these are the functions that links our routes to data sources //

const path = require("path");

// Routing //

module.exports = function(app) {

  // Creating the Routes 
  // SHould return the notes.html file //

    app.get("/notes", function(req, res) {

    res.sendFile(path.join(__dirname, "../public/notes.html"));

  });

  // If no matching route is found default to home //
  // Returning the index.html file //
  app.get("*", function(req, res) {

    res.sendFile(path.join(__dirname, "../public/index.html"));

  });
  
};