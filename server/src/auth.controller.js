const auth = require('./firebase');

const getAllUsers = async (req, res) => {
	try {
		const listUsersResult = await auth.listUsers();
		res.status(200).send(listUsersResult);
	} catch (error) {
		console.error(error);
	}
};

const getUser = async (req, res) => {
	try {
		const userRecord = await auth.getUser(req.params.uid);
		console.log(userRecord);
		res.status(200).send(userRecord);
	} catch (error) {
		console.error(error);
	}
};

const registerUser = async (req, res) => {
	console.log(req.body);
	try {
		const { email } = req.body;
		const userRecord = await auth.createUser({
			email,
			password: 'Test_1234',
			disabled: false,
		});
		if (userRecord) {
			return res.status(201).send(userRecord);
		}
		return res.status(400).send();
	} catch (error) {
		res.status(400).send({ msg: error.message });
		console.error(error.message);
	}
};

const updateUser = async (req, res) => {
	try {
		const { uid } = req.params;
		const { email } = req.body;
		const userRecord = await auth.updateUser(uid, {
			email,
		});
		if (userRecord) {
			return res.status(200).send();
		}
		return res.status(400).send();
	} catch (error) {
		res.status(400).send();
		console.error(error);
	}
};

const toggleStatus = async (req, res) => {
	try {
		const { uid } = req.params;
		const { disabled } = req.body;
		const userRecord = await auth.updateUser(uid, {
			disabled: !disabled,
		});
		if (userRecord) {
			return res.status(200).send();
		}
		return res.status(400).send();
	} catch (error) {
		res.status(400).send();
		console.error(error);
	}
};

const deleteUser = async (req, res) => {
	try {
		const { uid } = req.params;
		await auth.deleteUser(uid);
		return res.status(200).send({ msg: 'User deleted!' });
	} catch (error) {
		res.status(400).send('Error!');
		console.error(error);
	}
};

module.exports = {
	getAllUsers,
	registerUser,
	getUser,
	updateUser,
	toggleStatus,
	deleteUser,
};
