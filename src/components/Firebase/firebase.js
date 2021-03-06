import app from "firebase/app";

import "firebase/database";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyAyiEnQ8kK74eH7UJ7BjsaHRoSZQcuqikU",
  authDomain: "grex-6d87e.firebaseapp.com",
  databaseURL: "https://grex-6d87e.firebaseio.com",
  projectId: "grex-6d87e",
  storageBucket: "grex-6d87e.appspot.com",
  messagingSenderId: "1086033718659"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(snapshot => {
            const dbUser = snapshot.val();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  // *** EVENTS (CONTAINING: DATE, TIME, INVITEES, HOST) API ***

  events = () => this.db.ref("events");

  event = uid => this.db.ref(`events/${uid}`);
  // *** EVENT DATE AND TIME API ***

  bookedEventDateTimes = () => this.db.ref("bookedEventDateTimes");
}

export default Firebase;
