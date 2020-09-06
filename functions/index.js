const functions = require('firebase-functions');
const admin = require('firebase-admin');
var firebaseHelper = require('firebase-functions-helper/dist');
const express = require('express');
const bodyParser = require('body-parser');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const app = express();
const main = express();

main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use('/api', app);

exports.webApi = functions.https.onRequest(main);

app.get('/getAll/:collectionName', async (req, res) => {
    try {
        await firebaseHelper.firestore.backup(db, req.params.collectionName)
            .then(data => res.status(200).send(data));
    } catch (error) {
        res.status(400).send('Invalid Request!!');
    }
});

app.get('/get/:collectionName/:id', async (req, res) => {
    try {
        await firebaseHelper.firestore.getDocument(db, req.params.collectionName, req.params.id)
            .then(doc => res.status(200).send(doc));
    } catch (error) {
        res.status(400).send('Invalid Request!!');
    }
});

app.patch('/update/:collectionName/:Id', async (req, res) => {
    try {
        await firebaseHelper.firestore.updateDocument(db, req.params.collectionName, req.params.Id, req.body);
        res.status(200).send('Document Updated Successfully');
    } catch (error) {
        res.status(400).send('Invalid Request!!');
    }
});


exports.helloWorld = functions.firestore.document('bell_01/{flag}').onUpdate((snapshot, context) => {
    msgData = snapshot.data();
    a = snapshot.id;
    try {

        const doc = admin.firestore().collection('bell_01').doc(a);
        a1 = doc.id;

        console.log("Document Id is ************** " + a1);
        var payload = {
            notification: {
                title: "Bongo Alerts",
                body: "Someone is ringing your bell",
                sound: "default",
                icon: "myicon",
            },
            data: {
                id: a,
                type: "Bongo",
                click_action: "FLUTTER_NOTIFICATION_CLICK"
            }
        }
        admin.messaging().sendToTopic('BongoAlerts', payload).then((response) => {
            console.log("Ringing Alerts Pushed!");
            return 0;
        }).catch((err) => {
            console.log(err);
        });

        return 0;
    } catch (e) {
        console.log("from try/catch error:" + e);
    }
});
