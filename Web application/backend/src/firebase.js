// firebase.js
const admin = require('firebase-admin');
require('dotenv').config(); // charge les variables depuis .env
const serviceAccount =JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
