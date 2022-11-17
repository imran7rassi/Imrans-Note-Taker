
// use the express to require the data //

const express = require('express');

// we use the express for the app //

const app = express();

// creating the port for the variables //
const PORT = process.env.PORT || 4050;


// asks express to create a route for every
//file in the 'public' folder //

app.use(express.static('public'));

// sets up express app to handel data parser,
// middle wear created req.body

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// adding the routes from our routing files //

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);


// adding app listener to starts the server //

app.listen(PORT, () => {
  console.log(`The Server is available at localhost:${PORT}`);
});
