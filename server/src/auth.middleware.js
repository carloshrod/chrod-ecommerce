const auth = require('./firebase');

const authMiddleware = (req, res, next) => {
	const tokenString = req?.headers?.authorization?.split(' ')[1];
	auth
		.verifyIdToken(tokenString)
		.then(decodedToken => {
			const uid = decodedToken.uid;
			console.log(uid);
			next();
		})
		.catch(error => {
			console.error(error);
		});
};

module.exports = authMiddleware;
