const regexText = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
const regexPhone = /^[(][1-9][0-9]{2}[)]\s[1-9][0-9]{2}[-][0-9]{4}$/;

const validateUser = form => {
	const { displayName, email, countryCode, phoneNumber, role } = form;

	const errors = {};

	if (!displayName) {
		errors.displayName = 'Field required!';
	} else if (!regexText.test(displayName)) {
		errors.displayName = 'Should only contain alphabetic characters!';
	}

	if (!email) {
		errors.email = 'Field required!';
	} else if (!regexEmail.test(email)) {
		errors.email = 'Please, enter a valid email!';
	}

	if (!countryCode) {
		errors.countryCode = 'Field required!';
	}

	if (!phoneNumber) {
		errors.phoneNumber = 'Field required!';
	} else if (!regexPhone.test(phoneNumber)) {
		errors.phoneNumber = 'Please enter a valid phone number!';
	}

	if (!role) {
		errors.role = 'Field required!';
	}

	return errors;
};

export default validateUser;
