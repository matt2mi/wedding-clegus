require('dotenv').config();
const path = require('path');
const emailValidator = require("email-validator");

const admin = require("firebase-admin");
// get credentials from params > service accounts
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

// TODO : bdd prod for heroku
// TODO : vérif champ rempli dans template de mail
// TODO : use return msg in front
// TODO : send new covoit subscribers
// TODO : ajouter logs pblm firebase

const getNewJourneyHtmlPart = (journey) => {
    return '<h3>Nouveau covoit\' proposé par ' + journey.driverFirstName + '</h3>' +
        '<p>' + journey.driverFirstName + ' propose ' + journey.freeSeats +
        ' places pour aller de ' + journey.fromCity + ' à ' + journey.toCity + ' le ' + journey.date + '.</p>' +

        '<p>Coordonnées :<br/>' + journey.driverFirstName + ' ' + journey.driverName +
        '<br/>Téléphone : ' + journey.driverPhoneNumber +
        '<br/>Email : ' + journey.driverEmail + '</p>' +

        '<p>Commentaire du conducteur :<br/>' + journey.comment + '</p>' +

        '<p>Made by Matou with <3 ;)</p>';
};
const sendNewJourneyMailToOwners = (journey) => {
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

const getNewJourneyConfirmationHtmlPart = (journey) => {
    return '<h3>' + journey.driverFirstName + ',<h3/>' +

        '<p>Merci pour votre proposition de covoiturage qui a bien été enregistrée.</p>' +

        '<p>Recapitulatif du trajet :<br/>' +
        'Telephone : ' + journey.driverPhoneNumber + '<br/>' +
        'Email : ' + journey.driverEmail + '<br/>' +
        'Date : ' + journey.date + '<br/>' +
        'Trajet : ' + journey.fromCity + ' > ' + journey.toCity + '<br/>' +
        'Sieges libres : ' + journey.freeSeats + '<br/>' +
        'Commentaire :<br/>' + journey.comment + '</p>' +

        '<p>Si tu le souhaites, tu peux à tout moment retrouver ici ton annonce :<br/>' +
        'https://mariageclegus.herokuapp.com/#/covoiturages/edit/' + journey.id + '<br/>' +
        'Utile aussi pour mettre à jour le nombre de sièges libres ;)<br/>' +

        '<p>À très vite !</p>' +

        '<p>Clémence et Augustin.</p>';
};
const sendNewJourneyConfirmationMail = (journey) => {
    return mailjet
        .post('send')
        .request({
            "FromEmail": "mariageclegus@gmail.com",
            "FromName": "Mariage Clegus",
            "Subject": "Trajet " + journey.fromCity + " - " + journey.toCity + " enregistré !",
            "Html-part": getNewJourneyConfirmationHtmlPart(journey),
            "Recipients": [{"Email": journey.driverEmail}]
        });
};

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
const sendNewPresenceMailToOwners = (presence) => {
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

const getPresenceConfirmationHtmlPart = (presence) => {
    return '<h3>' + presence.who + ',<h3/>' +

        '<p>Merci pour votre réponse, votre participation a bien été enregistrée.</p>' +

        '<p>Recapitulatif :<br/>' +
        'Nom : ' + presence.who + '<br/>' +
        'Telephone : ' + presence.phoneNumber + '<br/>' +
        'Email : ' + presence.email + '<br/>' +
        'Nombre de personnes : ' + presence.nbPersons + '<br/>' +
        'Nombre de parts méchoui: ' + presence.nbPorkPersons + '<br/>' +
        'Nombre de parts vegans: ' + presence.nbVeganPersons + '<br/>' +
        'Présence pour : <br/>' +

        (presence.whenSaturdayMorning ? '- le samedi matin<br/>' : '') +
        (presence.whenSaturdayLunch ? '- le samedi midi<br/>' : '') +
        (presence.whenSaturdayDiner ? '- le samedi soir<br/>' : '') +
        (presence.whenSundayLunch ? '- le dimanche midi<br/>Bouffe du dimanche: ' + presence.commentSundayLunchInfo + '<br/>' : '') +

        'Autre commentaire: ' + presence.comment + '</p>' +

        '<p>À très vite !</p>' +

        '<p>Clémence et Augustin.</p>';
};
const sendPresenceConfirmationMail = (presence) => {
    return mailjet
        .post('send')
        .request({
            "FromEmail": "mariageclegus@gmail.com",
            "FromName": "Mariage Clegus",
            "Subject": "Participation au mariage enregistrée !",
            "Html-part": getPresenceConfirmationHtmlPart(presence),
            "Recipients": [{"Email": presence.email}]
        });
};

const getSubscriptionConfirmationHtmlPart = (email) => {
    return '<h3>Inscription au news de covoiturages</h3>' +

        '<p>Votre adresse email a bien été ajoutée à la liste. Vous serez prévenu par mail dès qu\'un nouveau ' +
        'covoiturage sera ajouté.</p>' +

        // '<p>Pour vous désinscrire, cliquez ici :<br/>' +
        // '<a href=\"https://mariageclegus.herokuapp.com/#/covoiturages/desinscription/' + email + '\">se désinscrire</a></p>' +

        '<p>À très vite !</p>' +

        '<p>Clémence et Augustin.</p>';
};
const sendSubscriptionConfirmationMail = (email) => {
    return mailjet
        .post('send')
        .request({
            "FromEmail": "mariageclegus@gmail.com",
            "FromName": "Mariage Clegus",
            "Subject": "Inscription aux covoiturages enregistrée !",
            "Html-part": getSubscriptionConfirmationHtmlPart(email),
            "Recipients": [{"Email": email}]
        });
};

module.exports = function (app, indexFilePath) {

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
                console.log('GET - /api/journeys - get all journeys');
            } else {
                res.json({});
                console.log('GET - /api/journeys - no existing journey yet');
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
                date: journey.date,
                fromCity: journey.fromCity,
                toCity: journey.toCity,
                freeSeats: journey.freeSeats,
                comment: journey.comment
            };

            res.json(result);
            console.log(`GET - /api/journey/${req.params.id} - get journey with id: ${result.id}`);
        });
    });

    app.post('/api/journey', (req, res) => {
        db.ref("journeys")
            .push({
                driverFirstName: req.body.driverFirstName,
                driverName: req.body.driverName,
                driverPhoneNumber: req.body.driverPhoneNumber,
                driverEmail: req.body.driverEmail,
                date: req.body.date,
                fromCity: req.body.fromCity,
                toCity: req.body.toCity,
                freeSeats: req.body.freeSeats,
                comment: req.body.comment
            }, (error) => {
                if (error) {
                    res.json({
                        saved: false,
                        message: 'Désolé, votre trajet n\'a pas été enregistré, réessayez plus tard.'
                    });
                    console.error('error creating journey:', error);
                } else {
                    sendNewJourneyMailToOwners(req.body)
                        .then(() => {
                            console.log('POST - /api/journey - mail sent to owners');
                        })
                        .catch(error => {
                            console.error('POST - /api/journey - error sending mail to owners', error);
                        });
                    if (isValidMailAddress(req.body.driverEmail)) {
                        sendNewJourneyConfirmationMail(req.body)
                            .then(() => {
                                console.log(`POST - /api/journey - confirmation mail sent to: ${req.body.driverEmail}`);
                            })
                            .catch(error =>
                                console.error(
                                    `POST - /api/journey - error sending confirmation mail to: ${req.body.driverEmail}, error:`,
                                    error));
                    } else {
                        console.error(`POST - /api/journey - error wrong mail address: ${req.body.driverEmail}`);
                    }
                    res.status(200).json({
                        saved: true,
                        message: 'Trajet sauvegardé. Si vous avez renseigné une adresse email, vous recevrez bientôt ' +
                        'un mail de confirmation.'
                    });
                    console.log(
                        `POST - /api/journey - journey created for ${req.body.driverFirstName} ${req.body.driverName}`
                    );
                }
            });
    });

    app.put('/api/journey', (req, res) => {
        db.ref("journeys/" + req.body.id)
            .set({
                driverFirstName: req.body.driverFirstName,
                driverName: req.body.driverName,
                driverPhoneNumber: req.body.driverPhoneNumber,
                driverEmail: req.body.driverEmail,
                date: req.body.date,
                fromCity: req.body.fromCity,
                toCity: req.body.toCity,
                freeSeats: req.body.freeSeats,
                comment: req.body.comment
            }, (error) => {
                if (error) {
                    res.json({
                        saved: false,
                        message: 'La modification n\'a pas été enregistrée, veuillez réessayer plus tard.'
                    });
                    console.error('PUT - /api/journey - error updating journey:', error);
                } else {
                    if (req.body.driverEmail !== '') {
                        sendNewJourneyConfirmationMail(req.body)
                            .then(() => {
                                console.log(`PUT - /api/journey - journey confirmation sent ${req.body.driverEmail}`);
                            })
                            .catch(error =>
                                console.error(
                                    `PUT - /api/journey - error sending confirmation mail to: ${req.body.driverEmail}, error:`,
                                    error));
                    }
                    res.status(200).json({
                        saved: true,
                        message: 'Modification enregistrée. Si vous avez renseigné une adresse email, vous recevrez bientôt un mail de confirmation.'
                    });
                    console.log(`PUT - /api/journey - journey ${req.body.id} updated`);
                }
            });
    });

    app.delete('/api/journey', (req, res) => {
        db.ref("journeys/" + req.body.id)
            .remove((error) => {
                if (error) {
                    res.json({
                        saved: false,
                        message: 'La suppression n\'a pas été enregistrée, veuillez réessayer plus tard.'
                    });
                    console.error(`DELETE - /api/journey - error deleting journey ${req.body.id}, error:`, error);
                } else {
                    // TODO : sendConfirmationMail ?
                    res.status(200).json({});
                    console.log(`DELETE - /api/journey - journey ${req.body.id} deleted`);
                }
            });
    });

    app.post('/api/carSharingSubscribe', (req, res) => {
        if (emailValidator.validate(req.body.email)) {
            db.ref("subscriptions")
                .push(
                    {email: req.body.email, activated: true},
                    (error) => {
                        if (error) {
                            res.json({
                                saved: false,
                                message: 'L\'abonnement n\'a pas fonctionné, réessayez plus tard.'
                            });
                            console.error(
                                `POST - /api/carSharingSubscribe - error subscribing ${req.body.email}, error:`,
                                error);
                        } else {
                            sendSubscriptionConfirmationMail(req.body.email)
                                .then(() =>
                                    console.log('POST - /api/carSharingSubscribe - subscription confirmation mail sent'))
                                .catch(error =>
                                    console.error(
                                        'POST - /api/carSharingSubscribe - error sending subscription confirmation mail',
                                        error));
                            res.json({saved: true, message: `Abonnement enregistré pour ${req.body.email} !`});
                            console.log(`POST - /api/carSharingSubscribe - new subscription saved for ${req.body.email}`);
                        }
                    });
        } else {
            console.error(`POST - /api/carSharingSubscribe - error wrong mail address: ${req.body.email}`);
            res.json({saved: false, message: `Désolé, ${req.body.email} n'est pas une adresse email valide.`});
        }
    });

    // app.get('/api/carSharingUnsubscribe/:email', (req, res) => {
    //     db.ref("subscriptions").once("value", function (snapshot) {
    //         const dbJourneys = snapshot.val();
    //         if (dbJourneys) {
    //             Object
    //                 .keys(dbJourneys)
    //                 .filter(key => dbJourneys[key].email === req.params.email)
    //                 .forEach(id => db.ref("subscriptions/" + id)
    //                     .set({email: req.params.email, activated: false}));
    //
    //             res.json({
    //                 saved: true,
    //                 message: `${req.params.email} est bien désinscrit, vous ne recevrez plus de messages concernant les nouvelles propositions de covoiturages.`
    //             });
    //             console.log(`GET - /api/carSharingUnsubscribe/${req.params.email} - unsubscribe ok`);
    //         } else {
    //             res.json({
    //                 saved: true,
    //                 message: `${req.params.email} n'était pas inscrit.`
    //             });
    //             console.error(`GET - /api/carSharingUnsubscribe/${req.params.email} - unsubscribe NOT ok`);
    //         }
    //     });
    // });

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
                console.log(`GET - /api/presences - ${result.length} presences sent`);
            } else {
                res.json({});
                console.log('GET - /api/presences - no existing presences yet.');
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
                    console.error('POST - /api/presence - error creating presence ', error);
                } else {
                    sendNewPresenceMailToOwners(req.body)
                        .then(() => console.log(`POST - /api/presence - new presence mail sent to owners`))
                        .catch(error => console.error(
                            'POST - /api/presence - error sending presence mail to owners, error:',
                            error));
                    if (emailValidator.validate(req.body.email)) {
                        sendPresenceConfirmationMail(req.body)
                            .then(() =>
                                console.log(`POST - /api/presence - new presence mail confirmation sent to ${req.body.email}`))
                            .catch(error => console.error(
                                `POST - /api/presence - new presence mail confirmation not sent to ${req.body.email}, error:`,
                                error));
                    } else {
                        console.error(`POST - /api/presence - error wrong mail address: ${req.body.email}`);
                    }
                    // TODO : modif message retour si envoi mail foireux
                    res.json({
                        saved: true,
                        message: 'Merci pour votre réponse, votre participation a bien été enregistrée.' +
                        ' Si vous avez renseigné une adresse email, vous recevrez bientôt un mail de confirmation.'
                    });
                    console.log(`POST - /api/presence - new presence answer created for ${req.body.who}`);
                }
            });
    });

    // send React's index.html file.
    app.get('*', (req, res) => {
        res.sendFile(path.join(indexFilePath));
    });
};