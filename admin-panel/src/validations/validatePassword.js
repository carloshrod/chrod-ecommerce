const regexPass =
	/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])((?=.*\W)|(?=.*_)).*$/;

const validatePassword = form => {
	const { currentPassword, newPassword, repeatNewPassword } = form;
	const errors = {};

	if (!currentPassword) {
		errors.currentPassword = 'Field required!';
	} else if (!regexPass.test(currentPassword)) {
		errors.currentPassword =
			'Current password should have a minimum length of 8; contain at least 1 uppercase letter, 1 lowercase letter, 1 number and one special character!';
	}

	if (!newPassword) {
		errors.newPassword = 'Field required!';
	} else if (!regexPass.test(newPassword)) {
		errors.newPassword =
			'New password should have a minimum length of 8; contain at least 1 uppercase letter, 1 lowercase letter, 1 number and one special character!';
	}

	if (!repeatNewPassword) {
		errors.repeatNewPassword = 'Field required!';
	} else if (newPassword !== repeatNewPassword) {
		errors.repeatNewPassword = "Passwords doesn't match";
	}

	return errors;
};

export default validatePassword;
