const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build'))); // Serve static files from the React app
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies

// set api routes
require('./api/api')(app, __dirname + '/client/build/index.html');

// Api server
const port = process.env.PORT || 5000;
app.listen(port);
console.log('Listening on port', port);