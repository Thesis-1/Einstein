const functions = require('firebase-functions');
// add firebase-admin moduel and initialize the Firebase app using it
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// Sample cloud function. Any time our Firebase instance receives an HTTP
// request, Firebase will send "Hello from Firebase!" in the response.

// Since we've offloaded this task to run entirely on Firebase, we won't
// have to allocate more server resources if we expect to receive a large
// number of HTTP requests. It makes sense to automate more operation-
// intensive batch processes (like data cleanup) with cloud functions so
// that our client-side application can be as performant as possible.
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});
