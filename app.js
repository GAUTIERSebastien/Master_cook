const { resolve } = require('path');
const express = require('express');
const app = express();
const router = require('./routers');

// CONFIGURATION DE L'APP
app.use( express.static(resolve('public')) );
app.use( router );

module.exports = app;