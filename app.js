const { resolve } = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


const router = require('./routing');

// CONFIGURATION DE L'APP
app.use(express.static(resolve('public')));
app.use(router);


module.exports = app;