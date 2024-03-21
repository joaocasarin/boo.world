'use strict';

const express = require('express');
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use('/', require('./routes/profile')());

module.exports = app;
