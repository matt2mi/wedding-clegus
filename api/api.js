// TODO : update journey confirmation on put
// TODO : send confirmation after deleted covoit
// TODO : vérifs mails existant (new sub, new présence => modif présence ??)
// TODO : cookie bloquer nouvelle presence et proposer modification
// TODO : jest - supertest - https://github.com/Sfeir/sfeir-school-nodejs/tree/project-12-readme/06_project
// TODO : vérif champ rempli dans template de mail
// TODO : use return msg in front
// TODO : ajouter logs pblm firebase
// TODO : refacto une seule fct sendMail(subject, htmlPart, recipients)
// TODO : réactiver sub covoit
// TODO : Unsubscribe dans mails - dans front demande de remplir son mail puis check si existe ou pas etc..

require('dotenv').config();
const emailValidator = require("email-validator");
const nodemailer = require('nodemailer');
const path = require('path');

const clegusPicSignature = path.join(__dirname, 'new-cle-gus-contact.png');
const cheers = path.join(__dirname, 'cheers-dicaprio.gif');

const admin = require("firebase-admin");
// get credentials from params > service accounts
admin.initializeApp({
    credential: admin.credential.cert({
        "type": process.env.TYPE,
        "project_id": process.env.PJ_ID,
        "private_key_id": process.env.PV_KEY_ID,
        "private_key": process.env.PV_KEY,
        "client_email": process.env.CLI_MAIL,
        "client_id": process.env.CLI_ID,
        "auth_uri": process.env.AUTH_URI,
        "token_uri": process.env.TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.CERT_URL,
        "client_x509_cert_url": process.env.CLI_CERT_URL
    }),
    databaseURL: process.env.BDD_URL
});
const db = admin.database();

// Nodemailer init
const smtpConfig = {
    host: process.env.AUTH_SMTP,
    port: parseInt(process.env.SMTP_PORT),
    secure: true,
    auth: {
        user: process.env.MAIL_VALUE,
        pass: process.env.MAIL_MDP
    }
};
const transporter = nodemailer.createTransport(smtpConfig);

// db path constants init
const SUBSCRIPTIONS_PATH = 'subscriptions';
const JOURNEYS_PATH = 'journeys';
const PRESENCES_PATH = 'presences';
const STATS_PATH = 'stats';

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
const sendNewJourneyMailToOwners = (journey, callback) => {
    transporter.sendMail(
        {
            from: 'Mariage Cle & Gus <' + process.env.MAIL_VALUE + '>',
            to: process.env.OWNERS_LIST,
            subject: 'Nouveau covoit\' proposé par ' + journey.driverFirstName,
            html: getNewJourneyHtmlPart(journey)
        },
        callback);
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
        process.env.SITE_URL + '/#/covoiturages/edit/' + journey.id + '<br/>' +
        'Utile aussi pour mettre à jour le nombre de sièges libres ;)<br/>' +

        '<p>À très vite !</p>' +

        '<p>Clémence et Augustin.</p>';
};
const sendNewJourneyConfirmationMail = (journey, callback) => {
    transporter.sendMail(
        {
            from: 'Mariage Cle & Gus <' + process.env.MAIL_VALUE + '>',
            to: journey.driverEmail,
            subject: 'Trajet ' + journey.fromCity + ' - ' + journey.toCity + ' enregistré !',
            html: getNewJourneyConfirmationHtmlPart(journey)
        },
        callback);
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
const sendNewPresenceMailToOwners = (presence, isUpdate, callback) => {
    transporter.sendMail(
        {
            from: 'Mariage Cle & Gus <' + process.env.MAIL_VALUE + '>',
            to: process.env.OWNERS_LIST,
            subject: presence.who + isUpdate ? ' a modifié sa présence' : ' en plus au mariage !',
            html: getNewPresenceHtmlPart(presence),
            attachments: {
                filename: 'cheers.png',
                path: cheers
            }
        },
        callback);
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
const sendPresenceConfirmationMail = (presence, callback) => {
    transporter.sendMail(
        {
            from: 'Mariage Cle & Gus <' + process.env.MAIL_VALUE + '>',
            to: presence.email,
            subject: 'Participation au mariage enregistrée !',
            html: getPresenceConfirmationHtmlPart(presence),
            attachments: {
                filename: 'clegus.png',
                path: clegusPicSignature
            }
        },
        callback);
};

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
const sendNewJourneyMailToSubscribers = (journey, callback) => {
    return db.ref(SUBSCRIPTIONS_PATH).once("value", function (snapshot) {
        const dbSubscribers = snapshot.val();
        if (dbSubscribers) {
            const subscribers = Object
                .keys(dbSubscribers)
                .filter(key => dbSubscribers[key].activated)
                .map(key => dbSubscribers[key].email);
            console.log('subscribers', subscribers);
            transporter.sendMail(
                {
                    from: 'Mariage Cle & Gus <' + process.env.MAIL_VALUE + '>',
                    to: subscribers,
                    subject: 'Un nouveau covoiturage a été ajouté !',
                    html: getNewJourneySubscribersHtmlPart(journey)
                },
                callback);
        } else {
            return new Promise.reject(null);
        }
    });
};

const getSubscriptionConfirmationHtmlPart = (email, key) => {
    return '<h3>Inscription au news de covoiturages</h3>' +

        '<p>Votre adresse email a bien été ajoutée à la liste. Vous serez prévenu par mail dès qu\'un nouveau ' +
        'covoiturage sera ajouté.</p>' +

        '<p>Pour vous désinscrire, cliquez ici :<br/>' +
        '<a href=\"' + process.env.SITE_URL + '/#/covoiturages/desinscription/' + key + '\">se désinscrire</a></p>' +

        '<p>Ou copier-collez ce lien dans votre navigateur: ' +
        process.env.SITE_URL + '/#/covoiturages/desinscription/' + key + '</p>' +

        '<p>À très vite !</p>' +

        '<p>Clémence et Augustin.</p>';
};
const sendSubscriptionConfirmationMail = (email, key, callback) => {
    transporter.sendMail(
        {
            from: 'Mariage Cle & Gus <' + process.env.MAIL_VALUE + '>',
            to: email,
            subject: 'Inscription aux covoiturages enregistrée !',
            html: getSubscriptionConfirmationHtmlPart(email, key)
        },
        callback);
};

const statsCallback = (error, committed, snapshot, res, logStr) => {
    if (error) {
        console.log(logStr + 'Transaction failed abnormally!', error);
        res.status(500).json({error});
    } else {
        res.status(200).json({});
    }
};

const validMailMessage = ' Vous recevrez bientôt un mail de confirmation.';

const testNbGoodMail = (db) => {
    db.ref('presences').once("value", function (snapshot) {
        const dbPresences = snapshot.val();

        if (dbPresences) {
            let presences = Object
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

            console.log('nb good mail address:',
                presences.filter(presence => emailValidator.validate(presence.email)).length);
            console.log('bad mail address:', presences
                .filter(presence => !emailValidator.validate(presence.email))
                .map(presence => presence.email));
        }
    });
};

module.exports = function (app) {

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
                let message = 'Trajet sauvegardé.';
                if (process.env.SEND_MAIL === 'true') {
                    sendNewJourneyMailToOwners({...req.body, id: newObject.key}, function (error) {
                        if (error) {
                            console.error(LOG_STR + ' error sending journey mail to owners', error);
                        } else {
                            console.log(LOG_STR + ' new journey mail sent to owners');
                        }
                    });

                    sendNewJourneyMailToSubscribers(req.body, function (error) {
                        if (error) {
                            console.error(LOG_STR + ' error sending mail to subscribers', error);
                        } else {
                            console.log(LOG_STR + ' mail sent to subscribers');
                        }
                    });
                    if (emailValidator.validate(req.body.driverEmail)) {
                        sendNewJourneyConfirmationMail({...req.body, id: newObject.key}, function (error) {
                            if (error) {
                                console.error(
                                    `${LOG_STR} error sending confirmation mail to: ${req.body.driverEmail}, error:`,
                                    error);
                            } else {
                                console.log(`${LOG_STR} confirmation mail sent to: ${req.body.driverEmail}`);
                                message += validMailMessage;
                            }
                        });
                    } else {
                        console.error(`${LOG_STR} error wrong mail address: ${req.body.driverEmail}`);
                    }
                }
                res.status(200).json({
                    saved: true,
                    message
                });
                console.log(`${LOG_STR} journey created for ${req.body.driverFirstName} ${req.body.driverName}`);
            })
            .catch((error) => {
                res.json({saved: false, message: 'Désolé, votre trajet n\'a pas été enregistré, réessayez plus tard.'});
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
                    let message = 'Modification enregistrée.';
                    if (process.env.SEND_MAIL === 'true' && emailValidator.validate(req.body.driverEmail)) {
                        sendNewJourneyConfirmationMail(req.body, function (error) {
                            if (error) {
                                console.error(
                                    `${LOG_STR} error sending confirmation mail to: ${req.body.driverEmail}, error:`,
                                    error);
                            } else {
                                console.log(`${LOG_STR}journey confirmation sent ${req.body.driverEmail}`);
                                message += validMailMessage;
                            }
                        });
                    }
                    res.status(200).json({
                        saved: true,
                        message
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
                    let message = 'Merci pour votre réponse, votre participation a bien été enregistrée.';
                    if (process.env.SEND_MAIL === 'true') {
                        sendNewPresenceMailToOwners(req.body, false, function (error) {
                            if (error) {
                                console.error(LOG_STR + 'error sending presence mail to owners, error:', error);
                            } else {
                                console.log('POST - /api/presence - new presence mail sent to owners:');
                            }
                        });
                        if (emailValidator.validate(req.body.email)) {
                            sendPresenceConfirmationMail(req.body, function (error) {
                                if (error) {
                                    console.error(
                                        `POST - /api/presence - new presence mail confirmation not sent to ${req.body.email}, error:`,
                                        error);
                                } else {
                                    message += validMailMessage;
                                    console.log(`POST - /api/presence - new presence mail confirmation sent to ${req.body.email}`);
                                }
                            });
                        } else {
                            console.error(`POST - /api/presence - error wrong mail address: ${req.body.email}`);
                        }
                    }

                    res.json({
                        saved: true,
                        message
                    });
                    console.log(`${LOG_STR}new presence answer created for ${req.body.who}`);
                }
            });
    });


    app.post('/api/carSharingSubscribe', (req, res) => {
        const LOG_STR = 'POST - /api/carSharingSubscribe - ';
        if (emailValidator.validate(req.body.email)) {
            const newObject = db.ref(SUBSCRIPTIONS_PATH).push();
            const promise = newObject.set({email: req.body.email, activated: true});
            promise
                .then(() => {
                    if (process.env.SEND_MAIL === 'true') {
                        sendSubscriptionConfirmationMail(req.body.email, newObject.key, error => {
                            if (error) {
                                console.error(
                                    LOG_STR + 'error sending subscription confirmation mail',
                                    error);
                            } else {
                                console.log(LOG_STR + 'subscription confirmation mail sent');
                            }
                        });
                    }
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

    // remind mail part
    app.get('/api/remindMail', (req, res) => {
        const LOG_STR = 'GET - /api/remindMail -';
        testNbGoodMail(db);
        require('./sundayFoodConfirmation')(db, transporter, (error, nbMailsSent) => {
            if (error) {
                res.status(500).json({saved: false, message: 'a pô marché, déso :/'});
                console.error(`${LOG_STR} ERROR - remind mails not sent: ${error}`);
            } else {
                res.status(200).json({saved: true, message: `bravo nils, t'as spammé ${nbMailsSent} personnes !`});
                console.log(`${LOG_STR} ${nbMailsSent} remind mails sent`);
            }
        });
    });

    app.get('/api/presences/:id', (req, res) => {
        const LOG_STR = 'GET - /api/presences/' + req.params.id + ' - ';
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
                    }))
                    .filter(presence => req.params.id === presence.id)[0];

                res.json(result);
                console.log(`${LOG_STR} presence sent: ${result.toString()}`);
            } else {
                res.json({});
                console.log(LOG_STR + 'no existing presences yet.');
            }
        });
    });

    app.put('/api/presence', (req, res) => {
        const LOG_STR = 'PUT - /api/presence - ';
        db.ref(PRESENCES_PATH + '/' + req.body.id)
            .set({
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
                    res.json({saved: false, message: 'Problème lors de la sauvegarde, réessayez plus tard.'});
                    console.error(LOG_STR + 'error updating presence ', error);
                } else {
                    let message = 'Merci pour votre réponse, votre participation a bien été mise à jour.';
                    if (process.env.SEND_MAIL === 'true') {
                        sendNewPresenceMailToOwners(req.body, true, function (error) {
                            if (error) {
                                console.error(LOG_STR + 'error sending presence mail to owners, error:', error);
                            } else {
                                console.log(LOG_STR + 'new presence mail sent to owners');
                            }
                        });
                        if (emailValidator.validate(req.body.email)) {
                            sendPresenceConfirmationMail(req.body, function (error) {
                                if (error) {
                                    console.error(
                                        `${LOG_STR}new presence mail confirmation not sent to ${req.body.email}, error:`,
                                        error);
                                } else {
                                    message += validMailMessage;
                                    console.log(`${LOG_STR}new presence mail confirmation sent to ${req.body.email}`);
                                }
                            });
                        } else {
                            console.error(`${LOG_STR}error wrong mail address: ${req.body.email}`);
                        }
                    }

                    res.json({
                        saved: true,
                        message
                    });
                    console.log(`${LOG_STR}new presence answer created for ${req.body.who}`);
                }
            });
    });


    app.get('/api/smartphoneView', (req, res) => {
        db.ref(STATS_PATH)
            .transaction(
                function (stats) {
                    if (stats && stats.nbSmartPhoneView) {
                        stats.nbSmartPhoneView++;
                    } else if (stats) {
                        stats.nbSmartPhoneView = 1;
                    } else {
                        return {nbSmartPhoneView: 1};
                    }
                    return stats;
                },
                (error, committed, snapshot) =>
                    statsCallback(error, committed, snapshot, res, 'GET - /api/smartphoneView - ')
            );
    });

    app.get('/api/view', (req, res) => {
        db.ref(STATS_PATH)
            .transaction(
                function (stats) {
                    if (stats && stats.nbView) {
                        stats.nbView++;
                    } else if (stats) {
                        stats.nbView = 1;
                    } else {
                        return {nbView: 1};
                    }
                    return stats;
                },
                (error, committed, snapshot) =>
                    statsCallback(error, committed, snapshot, res, 'GET - /api/view - ')
            );
    });

    app.get('/api/mainView', (req, res) => {
        db.ref(STATS_PATH)
            .transaction(
                function (stats) {
                    if (stats && stats.mainView) {
                        stats.mainView++;
                    } else if (stats) {
                        stats.mainView = 1;
                    } else {
                        return {mainView: 1};
                    }
                    return stats;
                },
                (error, committed, snapshot) =>
                    statsCallback(error, committed, snapshot, res, 'GET - /api/mainView - ')
            );
    });

    app.get('/api/infosView', (req, res) => {
        db.ref(STATS_PATH)
            .transaction(
                function (stats) {
                    if (stats && stats.infosView) {
                        stats.infosView++;
                    } else if (stats) {
                        stats.infosView = 1;
                    } else {
                        return {infosView: 1};
                    }
                    return stats;
                },
                (error, committed, snapshot) =>
                    statsCallback(error, committed, snapshot, res, 'GET - /api/infosView - ')
            );
    });

    app.get('/api/presenceFormView', (req, res) => {
        db.ref(STATS_PATH)
            .transaction(
                function (stats) {
                    if (stats && stats.presenceFormView) {
                        stats.presenceFormView++;
                    } else if (stats) {
                        stats.presenceFormView = 1;
                    } else {
                        return {presenceFormView: 1};
                    }
                    return stats;
                },
                (error, committed, snapshot) =>
                    statsCallback(error, committed, snapshot, res, 'GET - /api/presenceFormView - ')
            );
    });

    app.get('/api/presenceFormUpdateView', (req, res) => {
        db.ref(STATS_PATH)
            .transaction(
                function (stats) {
                    if (stats && stats.presenceFormUpdateView) {
                        stats.presenceFormUpdateView++;
                    } else if (stats) {
                        stats.presenceFormUpdateView = 1;
                    } else {
                        return {presenceFormUpdateView: 1};
                    }
                    return stats;
                },
                (error, committed, snapshot) =>
                    statsCallback(error, committed, snapshot, res, 'GET - /api/presenceFormUpdateView - ')
            );
    });

    app.get('/api/carSharingView', (req, res) => {
        db.ref(STATS_PATH)
            .transaction(
                function (stats) {
                    if (stats && stats.carSharingView) {
                        stats.carSharingView++;
                    } else if (stats) {
                        stats.carSharingView = 1;
                    } else {
                        return {carSharingView: 1};
                    }
                    return stats;
                },
                (error, committed, snapshot) =>
                    statsCallback(error, committed, snapshot, res, 'GET - /api/carSharingView - ')
            );
    });

    app.get('/api/subscribeView', (req, res) => {
        db.ref(STATS_PATH)
            .transaction(
                function (stats) {
                    if (stats && stats.subscribeView) {
                        stats.subscribeView++;
                    } else if (stats) {
                        stats.subscribeView = 1;
                    } else {
                        return {subscribeView: 1};
                    }
                    return stats;
                },
                (error, committed, snapshot) =>
                    statsCallback(error, committed, snapshot, res, 'GET - /api/subscribeView - ')
            );
    });

    app.get('/api/journeyEditView', (req, res) => {
        db.ref(STATS_PATH)
            .transaction(
                function (stats) {
                    if (stats && stats.journeyEditView) {
                        stats.journeyEditView++;
                    } else if (stats) {
                        stats.journeyEditView = 1;
                    } else {
                        return {journeyEditView: 1};
                    }
                    return stats;
                },
                (error, committed, snapshot) =>
                    statsCallback(error, committed, snapshot, res, 'GET - /api/journeyEditView - ')
            );
    });

    app.get('/api/hotelsNearbyView', (req, res) => {
        db.ref(STATS_PATH)
            .transaction(
                function (stats) {
                    if (stats && stats.hotelsNearbyView) {
                        stats.hotelsNearbyView++;
                    } else if (stats) {
                        stats.hotelsNearbyView = 1;
                    } else {
                        return {hotelsNearbyView: 1};
                    }
                    return stats;
                },
                (error, committed, snapshot) =>
                    statsCallback(error, committed, snapshot, res, 'GET - /api/hotelsNearbyView - ')
            );
    });

    app.get('/api/sundayFoodView', (req, res) => {
        db.ref(STATS_PATH)
            .transaction(
                function (stats) {
                    if (stats && stats.sundayFoodView) {
                        stats.sundayFoodView++;
                    } else if (stats) {
                        stats.sundayFoodView = 1;
                    } else {
                        return {sundayFoodView: 1};
                    }
                    return stats;
                },
                (error, committed, snapshot) =>
                    statsCallback(error, committed, snapshot, res, 'GET - /api/sundayFoodView - ')
            );
    });

    app.get('/api/invitationView', (req, res) => {
        db.ref(STATS_PATH)
            .transaction(
                function (stats) {
                    if (stats && stats.invitationView) {
                        stats.invitationView++;
                    } else if (stats) {
                        stats.invitationView = 1;
                    } else {
                        return {invitationView: 1};
                    }
                    return stats;
                },
                (error, committed, snapshot) =>
                    statsCallback(error, committed, snapshot, res, 'GET - /api/invitationView - ')
            );
    });

    app.get('/api/contactsView', (req, res) => {
        db.ref(STATS_PATH)
            .transaction(
                function (stats) {
                    if (stats && stats.contactsView) {
                        stats.contactsView++;
                    } else if (stats) {
                        stats.contactsView = 1;
                    } else {
                        return {contactsView: 1};
                    }
                    return stats;
                },
                (error, committed, snapshot) =>
                    statsCallback(error, committed, snapshot, res, 'GET - /api/contactsView - ')
            );
    });

    app.get('/api/presenceListView', (req, res) => {
        db.ref(STATS_PATH)
            .transaction(
                function (stats) {
                    if (stats && stats.presenceListView) {
                        stats.presenceListView++;
                    } else if (stats) {
                        stats.presenceListView = 1;
                    } else {
                        return {presenceListView: 1};
                    }
                    return stats;
                },
                (error, committed, snapshot) =>
                    statsCallback(error, committed, snapshot, res, 'GET - /api/presenceListView - ')
            );
    });
};