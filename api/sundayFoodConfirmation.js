const emailValidator = require("email-validator");

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

    '<p>Pour modifier vos informations, ' +
    '<a href="' + process.env.SITE_URL + '/#/presence/edit/' + infos.id + '">cliquez ici</a>.</p>' +
    '<p>Ou copier-collez ce lien dans votre navigateur: ' + process.env.SITE_URL + '/#/presence/edit/' + infos.id + '</p>' +

    '<p>Et si vous souhaitez faire du covoiturage, ' +
    '<a href="' + process.env.SITE_URL + '/#/covoiturages">ça se passe ici</a>.</p>' +
    '<p>Ou copier-collez ce lien dans votre navigateur: ' + process.env.SITE_URL + '/#/covoiturages</p>' +

    '<p>À très vite !</p>' +

    '<p>Clémence et Augustin.</p>';

module.exports = (db, transporter, callback) => {
    console.log('go remind !!');
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
                .filter(presence => emailValidator.validate(presence.email))
                .forEach(validEmailPresence => {
                    if (process.env.SEND_MAIL) {
                        // transporter.sendMail(
                        //     {
                        //         from: 'Mariage Cle & Gus <' + process.env.MAIL_VALUE + '>',
                        //         to: validEmailPresence.email,
                        //         subject: 'Rappel pour le Mariage de Clé & Gus',
                        //         html: getRemindMailText(validEmailPresence)
                        //     },
                        //     function (error) {
                        //         if (error) {
                        //             console.error('ERROR - Remind mail not sent :', error);
                        //         } else {
                        //             nbMailsSent++;
                        //         }
                        //     });
                    }
                    callback(null, nbMailsSent);
                });
        } else {
            callback('no existing presences yet.', 0);
        }
    });
};