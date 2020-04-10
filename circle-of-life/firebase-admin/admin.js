const admin = require("firebase-admin");
const serviceAccount = require("../config/fbServiceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://circle-of-life-app.firebaseio.com"
});

module.exports = admin;
