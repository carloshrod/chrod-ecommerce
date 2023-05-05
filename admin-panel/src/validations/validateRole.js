const validateRole = form => {
	const { roleName, permissions, description } = form;

	const errors = {};

	if (!roleName) {
		errors.roleName = 'Field required';
	}

	if (permissions.length === 0) {
		errors.permissions = 'Field required';
	}

	if (!description) {
		errors.description = 'Field required';
	}

	return errors;
};

export default validateRole;
