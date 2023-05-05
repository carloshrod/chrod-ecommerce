const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./auth.routes');
const authMiddleware = require('./auth.middleware');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authMiddleware);

app.use(router);

module.exports = app;
