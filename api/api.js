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
    // TODO vrai script start:server

    app.get('/api/journeys', (req, res) => {
        db.ref("journeys").once("value", function (snapshot) {
            const dbJourneys = snapshot.val();
            if (dbJourneys) {
                const result = Object
                    .keys(dbJourneys)
                    .map(key => ({
                        id: key,
                        driverFirstName: dbJourneys[key].driverFirstName,
                        driverName: dbJourneys[key].driverName,
                        driverPhoneNumber: dbJourneys[key].driverPhoneNumber,
                        driverEmail: dbJourneys[key].driverEmail,
                        fromCity: dbJourneys[key].fromCity,
                        toCity: dbJourneys[key].toCity,
                        freeSeats: dbJourneys[key].freeSeats,
                        comment: dbJourneys[key].comment
                    }));
                res.json(result);
                console.log('all journeys sent');
            } else {
                res.json({});
                console.log('no existing journeys yet');
            }
        });
    });

    app.get('/api/journey/:id', (req, res) => {
        db.ref("journeys").once("value", function (snapshot) {
            const journey = snapshot.val()[req.params.id];
            const result = {
                id: req.params.id,
                driverFirstName: journey.driverFirstName,
                driverName: journey.driverName,
                driverPhoneNumber: journey.driverPhoneNumber,
                driverEmail: journey.driverEmail,
                fromCity: journey.fromCity,
                toCity: journey.toCity,
                freeSeats: journey.freeSeats,
                comment: journey.comment
            };
            console.log(result);

            res.json(result);
            console.log('journey sent', result);
        });
    });

    app.post('/api/journey', (req, res) => {
        db.ref("journeys")
            .push({
                driverFirstName: req.body.driverFirstName,
                driverName: req.body.driverName,
                driverPhoneNumber: req.body.driverPhoneNumber,
                driverEmail: req.body.driverEmail,
                fromCity: req.body.fromCity,
                toCity: req.body.toCity,
                freeSeats: req.body.freeSeats,
                comment: req.body.comment
            }, () => {
                res.json({});
                console.log('journey created', req.body);
            });
    });

    app.delete('/api/journey', (req, res) => {
        db.ref("journeys/" + req.body.id)
            .remove(() => {
                res.status(200).json({});
                console.log('journey deleted');
            });
    });

    app.put('/api/journey', (req, res) => {
        db.ref("journeys" + req.body.id)
            .set({
                driverFirstName: req.body.driverFirstName,
                driverName: req.body.driverName,
                driverPhoneNumber: req.body.driverPhoneNumber,
                driverEmail: req.body.driverEmail,
                fromCity: req.body.fromCity,
                toCity: req.body.toCity,
                freeSeats: req.body.freeSeats,
                comment: req.body.comment
            }, () => {
                res.status(200).json({});
                console.log('journey updated');
            });
    });

    app.get('/api/presences', (req, res) => {
        db.ref("presences").once("value", function (snapshot) {
            const dbPresences = snapshot.val();

            if (dbPresences) {
                const result = Object
                    .keys(dbPresences)
                    .map(key => ({
                        id: key,
                        name: dbPresences[key].name,
                        firstname: dbPresences[key].firstname,
                        phoneNumber: dbPresences[key].phoneNumber,
                        email: dbPresences[key].email,
                        nbPersons: dbPresences[key].nbPersons,
                        nbVeganPersons: dbPresences[key].nbVeganPersons,
                        comment: dbPresences[key].comment
                    }));
                res.json(result);
                console.log('presences sent', result);
            } else {
                res.json({});
                console.log('no existing presences yet');
            }
        });
    });

    app.post('/api/presence', (req, res) => {
        db.ref("presences")
            .push({
                name: req.body.name,
                firstname: req.body.firstname,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                nbPersons: req.body.nbPersons,
                nbVeganPersons: req.body.nbVeganPersons,
                comment: req.body.comment
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