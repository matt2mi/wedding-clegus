const emailValidator = require("email-validator");
const Q = require("q");

const getPhotoMailText = () => {
    return '<h3>Bonjour à tou.te.s,</h3>' +

        '<p>Voila déjà deux semaines que nous nous sommes marié.e.s.</p>' +

        '<p>A l’occasion de cet hebdoversaire, nous tenions à vous remercier une nouvelle fois pour votre présence,' +
        ' votre aide, votre soutien et vos douces attentions.</p>' +

        '<p>On espère qu’on a su vous montrer notre plus beau sourire. Pour le vérifier, on vous propose de nous' +
        ' partager vos photos via google photo.</p>' +

        '<p>Comment faire ? Il vous suffit de copier ce lien tel quel (sans www) dans la barre d\'adresse' +
        ' : https://photos.app.goo.gl/EpQRDd5SrJKoey4GA<br />' +
        'Une fois que vous êtes sur le site, vous devez renseigner votre adresse email (n\'importe lequel, pas' +
        ' forcément gmail) et votre mot de passe. Puis cliquer sur « rejoindre » pour pouvoir participer au partage.<br />' +
        'Cliquez ensuite sur le premier icône en haut à droite « ajouter à l\'album » puis « sélectionner sur' +
        ' l\'ordinateur » : vous sélectionnez vos photos et cliquez sur « ok ». Les photos se téléchargent et sont' +
        ' ajoutées à l\'album.</p>' +

        '<p>Vous pouvez également télécharger les photos qui vous plaisent en cliquant sur la photo. Vous cliquez' +
        ' ensuite sur l’icône en haut à droite (les trois points verticaux) puis cliquez sur « télécharger ».<br />' +
        'Avant de transférer vos photos, n’oubliez pas de faire un tri 😊 .</p>' +

        '<p>Si c\'est trop compliqué ou que vous ne souhaitez pas passer par ce biais, vous pouvez nous envoyez vos' +
        ' photos via Wetransfer. Pour ceux qui ont des vidéos, vous pouvez aussi le faire pas Wetransfer car vous ne' +
        ' pouvez pas les transférer avec googlephoto.</p>' +

        '<p>Sinon, rien à voir avec la choucroute mais si certain.e.s n’ont pas récupéré leur plat, ils vous attendent' +
        ' probablement patiemment à Pouancé. Prévenez-nous pour qu’on s’arrange pour vous les rendre.</p>' +

        '<br />' +

        '<p>D’ici la prochaine, portez-vous bien !<br />' +
        'On vous embrasse,<br />' +
        'Merci encore</p>' +

        '<br />' +

        '<h4>Clé et Gus</h4>';
};

const asyncPhotoMailFunction = (validEmail, transporter, resolve, reject) => {
    if (process.env.SEND_MAIL === 'false') {
        transporter.sendMail(
            {
                from: 'Mariage Cle & Gus <' + process.env.MAIL_VALUE + '>',
                to: validEmail,
                subject: 'Photos du mariage clé et gus',
                html: getPhotoMailText()
            },
            function (error) {
                if (error) {
                    console.error('ERROR - Photo mail not sent :', error);
                    reject(validEmail);
                } else {
                    console.log('resolve - mail sent');
                    resolve(validEmail);
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
            const requests = Object
                .keys(dbPresences)
                .map(key => dbPresences[key].email)
                .filter(email => emailValidator.validate(email))
                // const requests = process.env.OWNERS_LIST.split(';')
                .map(validEmail =>
                    new Promise((resolve, reject) => asyncPhotoMailFunction(validEmail, transporter, resolve, reject))
                );

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