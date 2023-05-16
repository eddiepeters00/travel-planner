// Setup
const express = require('express');
const app = express();
const port = 3000;

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Static folders
app.use('/dist', express.static('dist'));
app.use('/public', express.static('public'));

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