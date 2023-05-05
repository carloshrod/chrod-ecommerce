const ERRORS = {
	'auth/user-not-found': 'Wrong credentials!',
	'auth/wrong-password': 'Wrong credentials!',
	'auth/invalid-email': 'Invalid email!',
	'auth/weak-password': 'New password is too weak!',
	defaultError: 'Server error!',
};

export const errorHandler = error => {
	const handler = ERRORS[error.code] || ERRORS.defaultError;
	return handler;
};
