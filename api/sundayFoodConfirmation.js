// const emailValidator = require("email-validator");
const nodemailer = require('nodemailer');

// Nodemailer init
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_VALUE,
        pass: process.env.MAIL_MDP
    }
});

const getRemindMailText = (infos) =>
    '<h3>' + infos.who + ',</h3>' +

    '<p>Recapitulatif :<br/>' +
    'Nom : ' + infos.who + '<br/>' +
    'Telephone : ' + infos.phoneNumber + '<br/>' +
    'Email : ' + infos.email + '<br/>' +
    'Nombre de personnes : ' + infos.nbPersons + '<br/>' +
    'Nombre de parts méchoui: ' + infos.nbPorkPersons + '<br/>' +
    'Nombre de parts vegans: ' + infos.nbVeganPersons + '<br/>' +
    'Présence pour : <br/>' +

    (infos.whenSaturdayMorning ? '- le samedi matin<br/>' : '') +
    (infos.whenSaturdayLunch ? '- le samedi midi<br/>' : '') +
    (infos.whenSaturdayDiner ? '- le samedi soir<br/>' : '') +
    (infos.whenSundayLunch ? '- le dimanche midi<br/>Bouffe du dimanche: ' + infos.commentSundayLunchInfo + '<br/>' : '') +

    'Autre commentaire: ' + infos.comment + '</p>' +

    '<p>Pour modifier vos informations, <a href="https://mariageclegus.herokuapp.com/#/presence/edit/' + infos.id + '">cliquez ici</a>. </p>' +
    '<p>Et si vous souhaitez faire du covoiturage, <a href="http://mariageclegus.herokuapp.com/#/covoiturages">ça se passe ici</a>. </p>' +

    '<p>À très vite !</p>' +

    '<p>Clémence et Augustin.</p>';

const sendNewJourneyMailToOwners = (infos, callback) =>
    transporter.sendMail(
        {
            from: 'Mariage Cle & Gus <mariageclegus@gmail.com>',
            to: infos.email,
            subject: 'Rappel Mariage Clé & Gus',
            html: getRemindMailText(infos)
        },
        callback);

module.exports = (db, callback) => {
    console.log('bite');
    db.ref('presences').once("value", function (snapshot) {
        const dbPresences = snapshot.val();

        if (dbPresences) {
            let nbMailsSent = 0;
            Object
                .keys(dbPresences)
                .map(key => ({
                    id: key,
                    who: dbPresences[key].who,
                    phoneNumber: dbPresences[key].phoneNumber,
                    email: '2m1tema@gmail.com',
                    // email: dbPresences[key].email,
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
                .filter(presence => presence.id === '-LI2zaDYowVRCa_RYilN')
                // .filter(presence => emailValidator.validate(presence.email))
                .forEach(validEmailPresence => {
                    if (process.env.SEND_MAIL) {
                        sendNewJourneyMailToOwners(validEmailPresence, function (error, body) {
                            if (error) {
                                console.error('ERROR - Remind mail not sent :', error);
                            } else {
                                nbMailsSent++;
                                console.log('SUCCESS - Remind mail sent', body);
                            }
                        });
                    }
                    callback(null, 1);
                });
        } else {
            callback('no existing presences yet.', 0);
        }
    });
};