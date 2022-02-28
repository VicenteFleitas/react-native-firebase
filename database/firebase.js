import firebase from "firebase/compat/app";

import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "HERE YOUR API KEY",
  authDomain: "crudfirebase-860ac.firebaseapp.com",
  databaseURL: "https://crudfirebase-860ac.firebaseio.com",
  projectId: "crudfirebase-860ac",
  storageBucket: "crudfirebase-860ac.appspot.com",
  messagingSenderId: "81167826212",
  appId: "1:81167826212:web:41b900e59296951fe7c7b1",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db,
};
