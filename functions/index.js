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


exports.helloWorld = functions.firestore.document('DateTime/{Id}').onCreate((snapshot, context) => {
    msgData = snapshot.data();
    a = snapshot.id;
    console.log("****************Document is Created**************");
    console.log(`****************Document ID ${a}*****************`);
});
