const path = require('path');

// firebase connection - https://firebase.google.com/docs/admin/setup
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(require('../clegus-wedding-db-credentials')),
    databaseURL: "https://clegus-wedding-db.firebaseio.com"
});
const db = admin.database();

module.exports = function (app, indexFilePath) {
    // TODO faire un retour propre avec juste statut
    
    // Put all API endpoints under '/api'
    app.get('/api/journeys', (req, res) => {
        db.ref("journeys/details").once("value", function (snapshot) {
            const dbJourneys = snapshot.val();
            const result = Object
                .keys(dbJourneys)
                .map(key => ({
                    id: key,
                    name: dbJourneys[key].name,
                    fromCity: dbJourneys[key].fromCity,
                    toCity: dbJourneys[key].toCity,
                    freeSeats: dbJourneys[key].freeSeats,
                    totalSeats: dbJourneys[key].totalSeats,
                    price: dbJourneys[key].price,
                    driverPhoneNumber: dbJourneys[key].driverPhoneNumber
                }));
            res.json(result);
            console.log('journeys sent', result);
        });
    });

    app.get('/api/journey/:id', (req, res) => {
        db.ref("journeys/details").once("value", function (snapshot) {
            const journey = snapshot.val()[req.params.id];
            const result = {
                id: req.params.id,
                fromCity: journey.fromCity,
                toCity: journey.toCity,
                freeSeats: journey.freeSeats,
                totalSeats: journey.totalSeats,
                price: journey.price,
                driverPhoneNumber: journey.driverPhoneNumber
            };
            console.log(result);

            res.json(result);
            console.log('journey sent', result);
        });
    });

    app.post('/api/journey', (req, res) => {
        db.ref("journeys")
            .child("details")
            .push({
                toCity: req.body.toCity,
                fromCity: req.body.fromCity,
                driverPhoneNumber: req.body.driverPhoneNumber,
                freeSeats: req.body.freeSeats,
                totalSeats: req.body.totalSeats,
                price: req.body.price
            }, () => {
                res.json({});
                console.log('journey created', req.body);
            });
    });

    app.delete('/api/journey', (req, res) => {
        db.ref("journeys")
            .child("details/" + req.body.id)
            .remove(() => {
                res.status(200).json({});
                console.log('journey deleted');
            });
    });

    app.put('/api/journey', (req, res) => {
        db.ref("journeys")
            .child("details/" + req.body.id)
            .set({
                toCity: req.body.toCity,
                fromCity: req.body.fromCity,
                driverPhoneNumber: req.body.driverPhoneNumber,
                freeSeats: req.body.freeSeats,
                totalSeats: req.body.totalSeats,
                price: req.body.price
            }, () => {
                res.status(200).json({});
                console.log('journey updated');
            });
    });

    app.post('/api/presence', (req, res) => {
        db.ref("presences")
            .child("answers")
            .push({
                name: req.body.name,
                firstname: req.body.firstname,
                phoneNumber: req.body.phoneNumber,
                nbPersons: req.body.nbPersons
            }, (error) => {
                if (error) {
                    res.json({saved: false, message: error});
                    console.log('error saving presence ', error);
                } else {
                    res.json({saved: true, message: 'Réponse envoyée, à bientôt ' + req.body.firstname + ' !'});
                    console.log('presence answer created', req.body);
                }
            });
    });

    // send React's index.html file.
    app.get('*', (req, res) => {
        res.sendFile(path.join(indexFilePath));
    });
};