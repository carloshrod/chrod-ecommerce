const validateSignIn = form => {
	const { email, password } = form;

	const errors = {};

	if (!email) {
		errors.email = 'Field required!';
	}

	if (!password) {
		errors.password = 'Field required!';
	}

	return errors;
};

export default validateSignIn;
