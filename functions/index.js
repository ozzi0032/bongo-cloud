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

const collectionName = 'DateTime';
app.patch('/update/DateTime/:Id', async (req, res) => {
    try {
        console.log("********************In try block****************");
        await firebaseHelper.firestore.updateDocument(db, collectionName, req.params.Id, req.body);
        res.status(200).send('Document Updated Successfully');
    } catch (error) {
        res.status(400).send('Invalid Request!!');
    }
});

app.get('/get/DateTime/:id', async (req, res) => {
    try {
        console.log("********************In try block****************");
        const body = await firebaseHelper.firestore.getDocument(db, collectionName, req.params.id);
        const resBody = JSON.stringify(body);
        res.status(200).send(resBody);
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
