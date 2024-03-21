'use strict';

const cors = require('cors');
const express = require('express');
const app = express();
const { default: helmet } = require('helmet');

const profileRoute = require('./routes/profile');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type']
}));
app.use(helmet());

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use('/', profileRoute);

module.exports = app;
