import "firebase/auth";
import "firebase/database";

import app from "firebase/app";

var config = {
  apiKey: "AIzaSyAzAK1qkxm1mH7Zf6vsm8CyNMTrbz07pnk",
  authDomain: "circle-of-life-app.firebaseapp.com",
  databaseURL: "https://circle-of-life-app.firebaseio.com",
  projectId: "circle-of-life-app",
  storageBucket: "circle-of-life-app.appspot.com",
  messagingSenderId: "634793384255",
  appId: "1:634793384255:web:9e802fa726778e321edb8a",
  measurementId: "G-FWHFN32NGH"
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

  doSignOut = () =>
    this.auth.signOut().catch(error => {
      console.log(error);
    });

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // doAddProvidedData = (gender, dob) => this.auth

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (dbUser && !dbUser.roles) {
              dbUser.roles = [];
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              name: authUser.name,
              gendeer: authUser.gendeer,
              dob: authUser.dob,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              numberOfCircles: 0,
              circleObjects: { 1: {} },
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
}
export default Firebase;
