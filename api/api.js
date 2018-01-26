const path = require('path');

const JOURNEYS = require('../bdd/journeys');

module.exports = function (app, indexFilePath) {
    // Put all API endpoints under '/api'
    app.get('/api/journeys', (req, res) => {
        res.json(JOURNEYS);
        console.log('journeys sent');
    });
    app.get('/api/journey/:id', (req, res) => {
        res.json(JOURNEYS[req.params.id]);
        console.log('journey sent');
    });
    app.post('/api/journey', (req, res) => {
        console.log(req.body);
        JOURNEYS.push(req.body);
        res.json(JOURNEYS[JOURNEYS.length - 1]);
        console.log('journey created');
    });
    app.put('/api/journey', (req, res) => {
        console.log(req.body);
        const updateJourneyId = req.body.id;
        JOURNEYS[updateJourneyId] = req.body;
        res.json(JOURNEYS[updateJourneyId]);
        console.log('journey updated');
    });

    // send React's index.html file.
    app.get('*', (req, res) => {
        res.sendFile(path.join(indexFilePath));
    });
};