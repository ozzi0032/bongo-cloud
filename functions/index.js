const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.firestore.document('DateTime/{Id}').onCreate((snapshot, context) => {
    msgData = snapshot.data();
    a = snapshot.id;
    console.log("****************Document is Created**************");
    console.log(`****************Document ID ${a}*****************`);
});
