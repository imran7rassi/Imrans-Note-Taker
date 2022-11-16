
// Dependencies //

const express = require("express");
const fs = require("fs")

// Express Configuration for the server //
// and tells the node that we are creating an "express" server //
    
// creating environment variable port
    const app = express();
    const PORT = process.env.PORT || 5040;


// we are asking the express for making
// file in the public server
// Sets up the Express app to handle data parsing //

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Parse the incoming JSON data //
    app.use("/assets", express.static("./assets"));


// require the routes to route the files //
    require('./routes/apiRoutes')(app);
    require('./routes/htmlRoutes')(app);


// App listener added for listening //

    app.listen(PORT, function () {

    console.log("The Server is available at the localhost" + PORT);

    });