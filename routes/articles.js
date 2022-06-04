var express = require("express");
var router = express.Router();

const { FirebaseApp, getApps, initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore, getDoc, doc, collection, getDocs, addDoc, setDoc, updateDoc, serverTimestamp, Timestamp, orderBy } = require("firebase/firestore/lite");
const { getStorage } = require("firebase/storage");

const firebaseConfig = require("../config/firebase-credentials");

let firebaseApp = FirebaseApp;

if (!getApps.length) {
  firebaseApp = initializeApp(firebaseConfig);
}

const fireStore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);


router.get("/", async function(req, res, next) {

  // Get all articles
  var docs = [];
  const articlesCollection = collection(fireStore, 'articles');
  const articlesSnapshot = await getDocs(articlesCollection);
  await articlesSnapshot.docs.map(doc => {
    docs.push(doc);
  });
  
  if (docs.length != 0) {
    res.status(200);
    res.render('allArticles', {articles: docs});
  }else{
    res.status(404);
    res.render('404');
  }

});

router.get("/:id", async function(req, res, next) {

  // Get one article
  let articleID = req.params.id;
  const docRef = doc(fireStore, "articles/" + articleID);
  const docSnap = await getDoc(docRef);

  // Get all articles
  var docs = [];
  const articlesCollection = collection(fireStore, 'articles');
  const articlesSnapshot = await getDocs(articlesCollection);
  await articlesSnapshot.docs.map(doc => {
    docs.push(doc);
  });

  // Get all comments
  var comments = [];
  const commentsCollection = collection(fireStore, 'articles/'+articleID+'/commentaires');
  const commentsSnapshot = await getDocs(commentsCollection);
  await commentsSnapshot.docs.map(doc => {
    comments.push(doc);
  });
  

  if (docSnap._document) {
    res.status(200);
    res.render('articledetails', {docData : docSnap, articles: docs, commentaires: comments});
  }else{
    res.status(404);
    res.render('404');
  }

});

router.post("/comment/:id", async function(req, res, next) {
  console.log("Commentaire ok");
  // Get one article
  let articleID = req.params.id;
  let nom = req.body.nom;
  let email = req.body.email
  let comment = req.body.user_msg_comment;

  console.log(articleID);
  const articlesCollection = collection(fireStore, 'articles/'+articleID+"/commentaires");
  await addDoc(articlesCollection, {
    nom: nom,
    email: email,
    comment_text: comment,
    createdAt: serverTimestamp()

  }).then(() => {
    res.status(200);
    res.redirect("/articles/"+articleID);
  }).catch(() => {
    res.status(404);
    res.render("404");
  })

});

module.exports = router;
