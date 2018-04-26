require('dotenv').config();
const path = require('path');

// firebase connection - https://firebase.google.com/docs/admin/setup
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": process.env.PJ_ID,
        "private_key_id": process.env.PV_KEY_ID,
        "private_key": process.env.PV_KEY,
        "client_email": process.env.CLI_MAIL,
        "client_id": process.env.CLI_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": process.env.CLI_CERT_URL
    }),
    databaseURL: process.env.BDD_URL
});
const db = admin.database();


const mailjet = require('node-mailjet').connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
const getNewPresenceHtmlPart = presence => {
    let htmlMsg = '<h3>Et hop, ' + presence.who + ' en plus !</h3><p>';

    if (presence.phoneNumber !== '') htmlMsg += 'Téléphone : ' + presence.phoneNumber + '<br/>';
    if (presence.email !== '') htmlMsg += 'Email : ' + presence.email;
    htmlMsg += '</p>';

    if (presence.nbPersons > 1) {
        htmlMsg += '<p>Ils ou elles seront ' + presence.nbPersons + ' à venir.<br/>' +
            'Et seront présents:<br/>';
    }
    else htmlMsg += '<p>Il ou elle sera' + presence.nbPersons + ' à venir.<br/>' +
        'Et sera présent:<br/>';

    htmlMsg += presence.whenSaturdayMorning ? '- le samedi matin<br/>' : '';
    htmlMsg += presence.whenSaturdayLunch ? '- le samedi midi<br/>' : '';
    htmlMsg += presence.whenSaturdayDiner ? '- le samedi soir<br/>' : '';
    htmlMsg += presence.whenSundayLunch ? '- le dimanche midi<br/>' : '';
    htmlMsg += '</p>';

    if (presence.whenSaturdayLunch) htmlMsg += '<p>Dont ' + presence.nbPorkPersons +
        ' part(s) de méchoui et ' + presence.nbVeganPersons + ' part(s) végan(s)</p>';

    if (presence.commentSundayLunchInfo !== '') {
        htmlMsg += '<p>Pour le dimanche midi, cette (ces) personne(s) prévoie(ent) :<br/>' +
            presence.commentSundayLunchInfo + '</p>';
    }

    if (presence.comment !== '') {
        htmlMsg += '<p>Cette (ces) personne(s) souhaitait(ent) ajouter :<br/>' +
            presence.comment + '</p>';
    }

    htmlMsg += '<p>Made by Matou with <3 ;)</p>';

    return htmlMsg;
};
const sendNewPresenceMail = (presence) => {
    return mailjet
        .post('send')
        .request({
            "FromEmail": "mariageclegus@gmail.com",
            "FromName": "Mariage Clegus",
            "Subject": presence.who + " en plus au mariage !",
            "Html-part": getNewPresenceHtmlPart(presence),
            "Recipients": [{"Email": "2m1tema@gmail.com"}]
        });
};
const getNewJourneyHtmlPart = (journey) => {
    return "<h3>Nouveau covoit' proposé par " + journey.driverFirstName + "</h3>" +
        "<p>" + journey.driverFirstName + " propose " + journey.freeSeats +
        " places pour aller de " + journey.fromCity + " à " + journey.toCity + ".</p>" +

        "<p>Coordonnées :<br/>" + journey.driverFirstName + " " + journey.driverName +
        "<br/>Téléphone : " + journey.driverPhoneNumber +
        "<br/>Email : " + journey.driverEmail + "</p>" +

        "<p>Commentaire du conducteur :<br/>" + journey.comment + "</p>" +

        "<p>Made by Matou with <3 ;)</p>"
};
const sendNewJourneyMail = (journey) => {
    return mailjet
        .post('send')
        .request({
            "FromEmail": "mariageclegus@gmail.com",
            "FromName": "Mariage Clegus",
            "Subject": "Nouveau covoit' proposé par " + journey.driverFirstName,
            "Html-part": getNewJourneyHtmlPart(journey),
            "Recipients": [{"Email": "2m1tema@gmail.com"}]
        });
};

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
            }, (error) => {
                if (error) {
                    res.json({saved: false, message: error});
                    console.log('error creating journey ', error);
                } else {
                    sendNewJourneyMail(req.body)
                        .then(() => {
                            // TODO : if(req.body.email !== '') sendConfirmationMail();
                            res.json({saved: true, message: 'Mail new covoit\' envoyé !'});
                            console.log('journey created', req.body);
                        })
                        .catch(error => {
                            console.log('error new journey not created', error);
                        });
                }
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
        db.ref("journeys/" + req.body.id)
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
                        who: dbPresences[key].who,
                        phoneNumber: dbPresences[key].phoneNumber,
                        email: dbPresences[key].email,
                        nbPersons: dbPresences[key].nbPersons,
                        nbPorkPersons: dbPresences[key].nbPorkPersons,
                        nbVeganPersons: dbPresences[key].nbVeganPersons,
                        whenSaturdayMorning: dbPresences[key].whenSaturdayMorning,
                        whenSaturdayLunch: dbPresences[key].whenSaturdayLunch,
                        whenSaturdayDiner: dbPresences[key].whenSaturdayDiner,
                        whenSundayLunch: dbPresences[key].whenSundayLunch,
                        commentSundayLunchInfo: dbPresences[key].commentSundayLunchInfo,
                        comment: dbPresences[key].comment
                    }));
                res.json(result);
                console.log('presences sent', result);
            } else {
                res.json({});
                console.log('no existing presences yet.');
            }
        });
    });

    app.post('/api/presence', (req, res) => {
        db.ref("presences")
            .push({
                who: req.body.who,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                nbPersons: req.body.nbPersons,
                nbPorkPersons: req.body.nbPorkPersons,
                nbVeganPersons: req.body.nbVeganPersons,
                whenSaturdayMorning: req.body.whenSaturdayMorning,
                whenSaturdayLunch: req.body.whenSaturdayLunch,
                whenSaturdayDiner: req.body.whenSaturdayDiner,
                whenSundayLunch: req.body.whenSundayLunch,
                commentSundayLunchInfo: req.body.commentSundayLunchInfo,
                comment: req.body.comment
            }, (error) => {
                if (error) {
                    res.json({saved: false, message: error});
                    console.log('error creating presence ', error);
                } else {
                    sendNewPresenceMail(req.body)
                        .then(() => {
                            // TODO : if(req.body.email !== '') sendConfirmationMail();
                            res.json({saved: true, message: 'Mail new presence envoyé !'});
                            console.log('new presence answer created for', req.body.who);
                        })
                        .catch(error => {
                            console.log('error new presence not created', error);
                        });
                }
            });
    });

    // send React's index.html file.
    app.get('*', (req, res) => {
        res.sendFile(path.join(indexFilePath));
    });
};