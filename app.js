'use strict';

const express = require('express');
const app = express();

const profileRoute = require('./routes/profile');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use('/', profileRoute);

module.exports = app;
