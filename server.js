// Setup
const express = require('express');
const app = express();
const port = 3000;

// Connect CSS
app.use('/dist', express.static('dist'));

//Makes the public folder static
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Specify the location of the views folder
app.set('views', './views');


// ROUTING
const router = require('./routes/routes');
app.use(router);


// Listen on port 
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })