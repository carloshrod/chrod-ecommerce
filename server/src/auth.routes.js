const { Router } = require('express');
const pkg = require('../package.json');
const {
	registerUser,
	getUser,
	updateUser,
	toggleStatus,
	deleteUser,
	getAllUsers,
} = require('./auth.controller');

const router = Router();

router
	.get('/', (req, res) => {
		res.send(`
    <b>Name:</b> ${pkg.name}<br>
    <b>Author:</b> ${pkg.author}<br>
    <b>Version:</b> ${pkg.version}
    `);
	})

	.get('/api/v1/auth/', getAllUsers)
	.get('/api/v1/auth/:uid', getUser)
	.post('/api/v1/auth/', registerUser)
	.put('/api/v1/auth/:uid', updateUser)
	.patch('/api/v1/auth/:uid', toggleStatus)
	.delete('/api/v1/auth/:uid', deleteUser);

module.exports = router;
