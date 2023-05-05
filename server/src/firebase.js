const admin = require('firebase-admin');

const serviceAccount = require('../firebase-key.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

module.exports = auth;
