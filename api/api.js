require('dotenv').config();
const path = require('path');
const emailValidator = require("email-validator");

const admin = require("firebase-admin");
// get credentials from params > service accounts
// TODO  BDD_PV_KEY ??
admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": process.env.PJ_ID,
        "private_key_id": process.env.PV_KEY_ID,
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCtKMPfXjviddNS\ntE6xIW6DIGAJpmiUMMl0hT6uILOw7kaJJljx/tUM5TvRcBw07XhUZVdf8nuENQVA\nH5WC+3RLfjMhxTTiijq0CK6IAE+9XGNVmm12SfrpICJO+TvSVDelHz6VPik/NyMA\nY9iZ8EAX6W0YOunY+b9mkJsPfPa714stqQx2Ku0Lhu9/J2tsNhsruLxmx1jCvmjc\nlXpKsqY4iCPxs/Tysfolsop7v3CXHhyYehuWm/5n+J/kNCKFm9KMR3eP1l5MehHn\ni4ztQLZ6yhwEP1xayB4+5vowanwxRRxVXWoXXYwqRE1ZlFBvRwP79zbQphre5vP2\nojTd30dlAgMBAAECggEABB2msDm/byXRUNMv1qZ+h7feiIQv0qvpMe+T2pQ06TT0\nsMBcV14xBrYxKoyBYyGs3UauYb20AWO4PPqzNVKQRFYa1YfoNqVF+W8GZP2q54uZ\nYdjCls/x2pY0so9ahGiTjQV12ZrJZLMFDjaRWLFc+KSH/w4xbkKbcc7onKDiBXtz\nQF388loHZZdO/+UW/yeSVEjq0y8wwBHpJX5e8J7loQljCPGU0VATHOAOqoqdPrBp\n+33ShV95lqhtzqRURAaM9pCJYyVcoHvyaan1Oes55fzcLB/2pQ/AJhdjw0opa/Gz\n29sNbo3/mf2Zqr3TpEmdJwzg4qXDuwiRicuJQxUIAQKBgQDvTD/rX7uxAhJKs5w4\nyrB9VTzzLpAUFBgWd5EgrCBuxtAsHKW45pqqxhx/NZhQx53iJ72+ZwglCSYdM2PI\niSA6GTO6ejzLvgrOf+Mvanryb7dU1Gg1anZ6P+oOKCme5+k7D3TJpryGo8KCMWUf\nMMi2HGd0vvRpwvpHFttNAXP4AQKBgQC5PsHctSZEmp2sMrF3M9rpVZnNEJuGtDX1\nzhF3klrLCDXCHv1Dv1y29ObZ6jMn+kkF6IfF9hm1xN/T52Su5DtXMBFSj/Nr4TVk\nQS6wmtCkae/e5TU7uT3DFQtTX1McyVFlBdSxwprVSyWySRgptPCxw8h3P87Mytse\nyKzOspZvZQKBgQCjz1+mQbebeV6KMp/LpLziXzpFAmfwxryijKEVa58cFg8lU0sC\n4yGXq9yQHGEzUyK6URgrwh4qNDQaIza4bV5ZRy1JByqdEnAVYihkKhEV6vHmKS1Y\n+5M1JpGTtVygggL/whnhfLlrtaiONUAS9PNA7vrHSXzI9YccqQHgmhEIAQKBgQCb\nUfluOx05DIMDrQWLsxjr5/ArNq+QxG0yCnQu07H45otclms4cK0mYjVlpa766Cpu\nH8gnve9UrxwVKsEKuybeNdlwZm5tl8kSpGyne0dRc9nCBGEcEHeuqGh0oUqoqkvq\n7namDUuRZ47V69+sqJ/gDQ56ni+hGr2bFBuAu9DS2QKBgEOlotujNUqvRXXQ1p9l\nH1h6XwYQJKGkl+/6UTq7MQedN3WViUUPAcsKA09lu1kwow3x5q4L/hfca/e/hA2l\nRf2nI8N7IfVsMwrjAbSIub3lTk7+CL7AWifdCGPJ1Use3cDCm3oi5708OwzL6Nui\nSwvHBuZY3LhtWYnJT45ErojH\n-----END PRIVATE KEY-----\n",
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


const SUBSCRIPTIONS_PATH = 'subscriptions';
const JOURNEYS_PATH = 'journeys';
const PRESENCES_PATH = 'presences';

// TODO : send new covoit subscribers
// TODO : bdd prod for heroku
// TODO : vérif champ rempli dans template de mail
// TODO : use return msg in front
// TODO : ajouter logs pblm firebase
// TODO : refacto une seule fct sendMail(subject, htmlPart, recipients)

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
    return '<h3>' + journey.driverFirstName + ',</h3>' +

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
    return '<h3>' + presence.who + ',</h3>' +

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

const getSubscriptionConfirmationHtmlPart = (email, key) => {
    return '<h3>Inscription au news de covoiturages</h3>' +

        '<p>Votre adresse email a bien été ajoutée à la liste. Vous serez prévenu par mail dès qu\'un nouveau ' +
        'covoiturage sera ajouté.</p>' +

        '<p>Pour vous désinscrire, cliquez ici :<br/>' +
        '<a href=\"https://mariageclegus.herokuapp.com/#/covoiturages/desinscription/' + key + '\">se désinscrire</a></p>' +

        '<p>À très vite !</p>' +

        '<p>Clémence et Augustin.</p>';
};
const sendSubscriptionConfirmationMail = (email, key) => {
    return mailjet
        .post('send')
        .request({
            "FromEmail": "mariageclegus@gmail.com",
            "FromName": "Mariage Clegus",
            "Subject": "Inscription aux covoiturages enregistrée !",
            "Html-part": getSubscriptionConfirmationHtmlPart(email, key),
            "Recipients": [{"Email": email}]
        });
};

// TODO : unsubscribe dans chaque mail => comportement diff dans comp et api
const getNewJourneySubscribersHtmlPart = (journey) => {
    return '<h3>Nouveau covoiturage</h3>' +

        '<p>Un nouveau covoiturage a été ajouté pour venir à notre mariage.</p>' +

        '<p>Recapitulatif du trajet :<br/>' +
        'Date : ' + journey.date + '<br/>' +
        'Trajet : ' + journey.fromCity + ' > ' + journey.toCity + '<br/>' +
        'Sieges libres : ' + journey.freeSeats + '<br/>' +
        'Telephone : ' + journey.driverPhoneNumber + '<br/>' +
        'Email : ' + journey.driverEmail + '<br/>' +
        'Commentaire :<br/>' +
        journey.comment + '</p>' +

        '<p>À très vite !</p>' +

        '<p>Clémence et Augustin.</p>';
};
const sendNewJourneyMailToSubscribers = (journey) => {
    return db.ref(SUBSCRIPTIONS_PATH).once("value", function (snapshot) {
        const dbSubscribers = snapshot.val();
        if (dbSubscribers) {
            const subscribers = Object
                .keys(dbSubscribers)
                .filter(key => dbSubscribers[key].activated)
                .map(key => ({"Email": dbSubscribers[key].email}));
            console.log('subscribers', subscribers);
            return mailjet
                .post('send')
                .request({
                    "FromEmail": "mariageclegus@gmail.com",
                    "FromName": "Mariage Clegus",
                    "Subject": "Un nouveau covoiturage a été ajouté !",
                    "Html-part": getNewJourneySubscribersHtmlPart(journey),
                    "Recipients": subscribers
                });
        } else {
            return new Promise.reject(null);
        }
    });
};

module.exports = function (app, indexFilePath) {

    app.get('/api/journeys', (req, res) => {
        const LOG_STR = 'GET - /api/journeys - ';
        db.ref(JOURNEYS_PATH).once("value", function (snapshot) {
            const dbJourneys = snapshot.val();
            if (dbJourneys) {
                const result = Object
                    .keys(dbJourneys)
                    .filter(key => dbJourneys[key].activated)
                    .map(key => ({
                        id: key,
                        driverFirstName: dbJourneys[key].driverFirstName,
                        driverName: dbJourneys[key].driverName,
                        driverPhoneNumber: dbJourneys[key].driverPhoneNumber,
                        driverEmail: dbJourneys[key].driverEmail,
                        date: dbJourneys[key].date,
                        fromCity: dbJourneys[key].fromCity,
                        toCity: dbJourneys[key].toCity,
                        freeSeats: dbJourneys[key].freeSeats,
                        comment: dbJourneys[key].comment
                    }));
                res.json(result);
                console.log(LOG_STR + 'get all journeys');
            } else {
                res.json({});
                console.log(LOG_STR + 'no existing journey yet');
            }
        });
    });

    // TODO : ref("journeys/" + req.params.id ??
    app.get('/api/journey/:id', (req, res) => {
        db.ref(JOURNEYS_PATH).once("value", function (snapshot) {
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
        const LOG_STR = 'POST - /api/journey -';
        const newObject = db.ref(JOURNEYS_PATH).push();
        const promise = newObject.set({
            driverFirstName: req.body.driverFirstName,
            driverName: req.body.driverName,
            driverPhoneNumber: req.body.driverPhoneNumber,
            driverEmail: req.body.driverEmail,
            date: req.body.date,
            fromCity: req.body.fromCity,
            toCity: req.body.toCity,
            freeSeats: req.body.freeSeats,
            comment: req.body.comment,
            activated: true
        });

        promise
            .then(() => {
                sendNewJourneyMailToOwners({...req.body, id: newObject.key})
                    .then(() => {
                        console.log(LOG_STR + ' mail sent to owners');
                    })
                    .catch(error => {
                        console.error(LOG_STR + ' error sending mail to owners', error);
                    });
                sendNewJourneyMailToSubscribers(req.body)
                    .then(() => {
                        console.log(LOG_STR + ' mail sent to subscribers');
                    })
                    .catch(error => {
                        console.error(LOG_STR + ' error sending mail to subscribers', error);
                    });
                if (emailValidator.validate(req.body.driverEmail)) {
                    sendNewJourneyConfirmationMail({...req.body, id: newObject.key})
                        .then(() => {
                            console.log(`${LOG_STR} confirmation mail sent to: ${req.body.driverEmail}`);
                        })
                        .catch(error => {
                            console.error(
                                `${LOG_STR} error sending confirmation mail to: ${req.body.driverEmail}, error:`,
                                error);
                        });
                } else {
                    console.error(`${LOG_STR}  error wrong mail address: ${req.body.driverEmail}`);
                }
                res.status(200).json({
                    saved: true,
                    message: 'Trajet sauvegardé. Si vous avez renseigné une adresse email, vous recevrez bientôt ' +
                    'un mail de confirmation.'
                });
                console.log(
                    `${LOG_STR}  journey created for ${req.body.driverFirstName} ${req.body.driverName}`
                );
            })
            .catch((error) => {
                res.json({
                    saved: false,
                    message: 'Désolé, votre trajet n\'a pas été enregistré, réessayez plus tard.'
                });
                console.error(LOG_STR + ' error creating journey:', error);
            });
    });

    app.put('/api/journey', (req, res) => {
        const LOG_STR = 'PUT - /api/journey - ';
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
                comment: req.body.comment,
                activated: true
            }, (error) => {
                if (error) {
                    res.json({
                        saved: false,
                        message: 'La modification n\'a pas été enregistrée, veuillez réessayer plus tard.'
                    });
                    console.error(LOG_STR + 'error updating journey:', error);
                } else {
                    if (req.body.driverEmail !== '') {
                        sendNewJourneyConfirmationMail(req.body)
                            .then(() => {
                                console.log(`${LOG_STR}journey confirmation sent ${req.body.driverEmail}`);
                            })
                            .catch(error =>
                                console.error(
                                    `${LOG_STR}error sending confirmation mail to: ${req.body.driverEmail}, error:`,
                                    error));
                    }
                    res.status(200).json({
                        saved: true,
                        message: 'Modification enregistrée. Si vous avez renseigné une adresse email, vous recevrez bientôt un mail de confirmation.'
                    });
                    console.log(`${LOG_STR}journey ${req.body.id} updated`);
                }
            });
    });

    app.delete('/api/journey', (req, res) => {
        const LOG_STR = 'DELETE - /api/journey - ';
        db.ref("journeys/" + req.body.id)
            .update({activated: false})
            .then(() => {
                // TODO : sendConfirmationMail ?
                res.status(200).json({});
                console.log(`${LOG_STR}journey ${req.body.id} deleted`);
            })
            .catch((error) => {
                res.json({
                    saved: false,
                    message: 'La suppression n\'a pas été enregistrée, veuillez réessayer plus tard.'
                });
                console.error(`${LOG_STR}error deleting journey ${req.body.id}, error:`, error)
            });
    });

    app.post('/api/carSharingSubscribe', (req, res) => {
        const LOG_STR = 'POST - /api/carSharingSubscribe - ';
        if (emailValidator.validate(req.body.email)) {
            const newObject = db.ref(SUBSCRIPTIONS_PATH).push();
            const promise = newObject.set({email: req.body.email, activated: true});
            promise
                .then(() => {
                    sendSubscriptionConfirmationMail(req.body.email, newObject.key)
                        .then(() =>
                            console.log('subscription confirmation mail sent'))
                        .catch(error =>
                            console.error(
                                LOG_STR + 'error sending subscription confirmation mail',
                                error));
                    res.json({saved: true, message: `Abonnement enregistré pour ${req.body.email} !`});
                    console.log(`${LOG_STR}new subscription saved for ${req.body.email}`);
                })
                .catch((error) => {
                    res.json({
                        saved: false,
                        message: 'L\'abonnement n\'a pas fonctionné, réessayez plus tard.'
                    });
                    console.error(
                        `${LOG_STR}error subscribing ${req.body.email}, error:`,
                        error);
                });
        } else {
            res.json({saved: false, message: `Désolé, ${req.body.email} n'est pas une adresse email valide.`});
            console.error(`${LOG_STR}error wrong mail address: ${req.body.email}`);
        }
    });

    app.get('/api/carSharingUnsubscribe/:key', (req, res) => {
        const LOG_STR = `GET - /api/carSharingUnsubscribe/${req.params.key} - `;
        const ref = db.ref("subscriptions/" + req.params.key);
        ref.update({activated: false})
            .then(() => ref.once('value'))
            .then(function (snapshot) {
                // TODO : sendConfirmationMail ?
                res.json({
                    saved: true,
                    message: `${snapshot.val().email} est bien désinscrit, vous ne recevrez plus de messages concernant les nouvelles propositions de covoiturages.`
                });
                console.log(`${LOG_STR}unsubscribe ok for ${snapshot.val().email}`);
            })
            .catch((error) => {
                res.json({
                    saved: false,
                    message: `La désinscription n'a pas fonctionnée, vous pouvez réessayer plus tard.`
                });
                console.error(`${LOG_STR}unsubscribe NOT ok, error: ${error}`);
            });
    });

    app.get('/api/presences', (req, res) => {
        const LOG_STR = 'GET - /api/presences - ';
        db.ref(PRESENCES_PATH).once("value", function (snapshot) {
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
                console.log(`${LOG_STR}${result.length} presences sent`);
            } else {
                res.json({});
                console.log(LOG_STR + 'no existing presences yet.');
            }
        });
    });

    app.post('/api/presence', (req, res) => {
        const LOG_STR = 'POST - /api/presence - ';
        db.ref(PRESENCES_PATH)
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
                    console.error(LOG_STR + 'error creating presence ', error);
                } else {
                    sendNewPresenceMailToOwners(req.body)
                        .then(() => console.log(`POST - /api/presence - new presence mail sent to owners`))
                        .catch(error => console.error(
                            LOG_STR + 'error sending presence mail to owners, error:',
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
                    console.log(`${LOG_STR}new presence answer created for ${req.body.who}`);
                }
            });
    });

    // send React's index.html file.
    app.get('*', (req, res) => {
        res.sendFile(path.join(indexFilePath));
    });
};