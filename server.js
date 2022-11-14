
// Dependencies //

const express = require('express');

// Express Configuration for the server //
// and tells the node that we are creating an "express" server //

    const app = express();

// creating environment variable port
    const PORT = process.env.PORT || 3001;


// we are asking the express for making
// file in the public server
// Sets up the Express app to handle data parsing //

    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: true }));
    
// Parse the incoming JSON data //
    app.use(express.json());


// require the routes to route the files //
    require('./routes/apiRoutes')(app);
    require('./routes/htmlRoutes')(app);


// App listener added for listening //

    app.listen(PORT, () => {

    console.log(`The Server is available at the localhost${PORT}`);

    });