const path = require('path');

const JOURNEYS = require('../bdd/journeys');

module.exports = function (app, indexFilePath) {
    // Put all API endpoints under '/api'
    app.get('/api/journeys', (req, res) => {
        res.json(JOURNEYS);
        console.log('journeys sent');
    });

    // send React's index.html file.
    app.get('*', (req, res) => {
        res.sendFile(path.join(indexFilePath));
    });
};