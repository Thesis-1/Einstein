const request = require('request-promise');
const _ = require('lodash');

const functions = require('firebase-functions');
// add firebase-admin module and initialize the Firebase app using it
const admin = require('firebase-admin');
// .initializeApp() initializes our app, and is passed `functions.config().firebase`,
// which already has all the API keys/secrets to connecting our app because we used
// the Firebase CLI to log in
admin.initializeApp(functions.config().firebase);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


// All our cloud functions need to created and exported inside this `index.js`
// file.

// Since we've offloaded this task to run entirely on Firebase, we won't
// have to allocate more server resources if we expect to receive a large
// number of HTTP requests. It makes sense to automate more operation-
// intensive batch processes (like data cleanup) with cloud functions so
// that our client-side application can be as performant as possible.


// Sample cloud function. Any time our Firebase instance receives an HTTP
// request, Firebase will send "Hello from Firebase!" in the response.
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const LANGUAGES = ['es', 'fr', 'zh-CN'];

exports.translate = function.database.ref('/translations/{translationId}').onWrite(event => {
  const snapshot = event.data;
  const promises = [];

  _.each(LANGUAGES, (lang) => {
    console.log(lang);
    promises.push(createTranslationPromise(lang, snapshot));
  });
  return Promise.all(promises);
});

// URL to the Google Translate API
function createTranslateUrl(lang, text) {
  return `https://www.googleapis.com/language/translate/v2?key=${functions.config().firebase.apiKey}&source=en&target=${lang}&q=${text}`;
}

function createTranslationPromise(lang, snapshot) {
  const key = snapshot.key;
  const text = snapshot.val().english;
  let translation = {};

  return request(createTranslateUrl(lang, text), {resolveWithFullResponse: true}).then(
    response => {
      if (response.statusCode === 200) {
        const resData = JSON.parse(response.body).data;
        translation[lang] = resData.translations[0].translatedText;
        return admin.database().ref(`/translations/${key}`).update(translation);
      } else {
        throw response.body;
      }
    });
}