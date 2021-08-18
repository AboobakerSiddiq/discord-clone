import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAOpVxSilqXBjr4a2ufTkL6rcKurNbYt5Y",
  authDomain: "discord-clone-58404.firebaseapp.com",
  projectId: "discord-clone-58404",
  storageBucket: "discord-clone-58404.appspot.com",
  messagingSenderId: "978359096742",
  appId: "1:978359096742:web:2e29687da167787411eb67",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
