const emailValidator = require("email-validator");
const Q = require("q");
const path = require('path');

const getRemindMailText = (infos) =>
    '<h3>' + infos.who + ',</h3>' +

    '<p>Le 22 septembre approchant à grand pas, on vous fait une petite piqure de rappel pour quelques éléments pratiques !</p>' +
    '<p>Le centre-ville de Pouancé est quelque peu en chantier. On vous conseille donc de vous garer sur la place du champ de foire.' +
    ' Vous pouvez accéder à la Mairie en passant par le parc situé à gauche de l’école: <br/>' +
    '<a href="https://goo.gl/maps/DfJ86zBfLNN2">Voir sur google map</a>.' +
    '</p>' +
    '<p>N’oubliez pas vos palets, boules de pétanque, mölkky et autres jeux de plein air : il fera beau, au moins dans nos cœurs !</p>' +
    '<p>Prévoyez de quoi vous couvrir pour le soir car nous serons surtout en extérieur.</p>' +
    '<p>Pour les campeur-euse-s, il y a une douche à la salle. Il faudra peut être prendre votre ticket mais vous devriez' +
    ' pouvoir vous toiletter.</p>' +
    '<p>On vous a ajouté ci-dessous un petit récapitulatif des informations que vous aviez renseignez lors de votre inscription.</p>' +

    '<br/>' +

    '<p>On vous embrasse, on a hâte…</p>' +
    '<p>PS : pour le plus beau sourire de l’ouest, work in progress…<img src="cid:smile"/></p>' +

    '<br/>' +

    '<p>Récapitulatif :<br/>' +
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

const asyncFunction = (validEmailPresence, transporter, resolve, reject) => {
    if (process.env.SEND_MAIL === 'true') {
        transporter.sendMail(
            {
                from: 'Mariage Cle & Gus <' + process.env.MAIL_VALUE + '>',
                to: validEmailPresence.email,
                subject: 'Rappel pour le Mariage de Clé & Gus',
                html: getRemindMailText(validEmailPresence),
                attachments: [{
                    filename: 'smile.png',
                    path: path.join(__dirname, 'smile.png'),
                    cid: 'smile'
                }]
            },
            function (error) {
                if (error) {
                    console.error('ERROR - Remind mail not sent :', error);
                    reject(validEmailPresence.email);
                } else {
                    console.log('resolve - mail sent');
                    resolve(validEmailPresence.email);
                }
            });
    } else {
        reject();
    }
};

module.exports = (db, transporter, callback) => {
    db.ref('presences').once("value", function (snapshot) {
        const dbPresences = snapshot.val();

        if (dbPresences) {
            let requests = Object
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
                .filter(presence => process.env.OWNERS_LIST.includes(presence.email))
                .map((validEmailPresence) => {
                    return new Promise((resolve, reject) => {
                        asyncFunction(validEmailPresence, transporter, resolve, reject);
                    });
                });

            Q.allSettled(requests)
                .then(allPromiseResponse => {
                    const nbFulfilled = allPromiseResponse.filter(promise => promise.state === 'fulfilled').length;
                    console.log('nb mail sent fulfilled: ', nbFulfilled);

                    const rejecteds = allPromiseResponse.filter(promise => promise.state === 'rejected');
                    console.log('nb mail sent rejected: ', rejecteds.length);
                    rejecteds.forEach(rej => console.log(rej));

                    return nbFulfilled;
                })
                .catch(a => console.log('catch a', a))
                .done(nbFulfilled => callback(null, nbFulfilled));
        } else {
            callback('no existing presences yet.', 0);
        }
    });
};