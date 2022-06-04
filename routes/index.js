var express = require('express');
var router = express.Router();

const { FirebaseApp, getApps, initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore , getDocs, collection} = require('firebase/firestore/lite');
const { getStorage } = require('firebase/storage');

const firebaseConfig = require('../config/firebase-credentials');


let firebaseApp = FirebaseApp;

if (!getApps.length) {
  firebaseApp = initializeApp(firebaseConfig);
}

const fireStore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);


/* GET home page. */
router.get('/', async function(req, res, next)  {
  // Get all activites
  var docsActivites = [];
  const activitesCollection = collection(fireStore, 'activites');
  const activitesSnapshot = await getDocs(activitesCollection);
  await activitesSnapshot.docs.map(doc => {
    docsActivites.push(doc);
  });

  // Get all articles
  var docs = [];
  const articlesCollection = collection(fireStore, 'articles');
  const articlesSnapshot = await getDocs(articlesCollection);
  await articlesSnapshot.docs.map(doc => {
    docs.push(doc);
  });
  
  res.status(200);
  res.render('index', { articles : docs, activites : docsActivites});
});

module.exports = router;
