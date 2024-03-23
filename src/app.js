'use strict';

const cors = require('cors');
const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const { default: helmet } = require('helmet');

const profileRoutes = require('./routes/profile');
const commentRoutes = require('./routes/comment');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type']
}));
app.use(helmet());

// set the view engine to ejs
app.set('views', './src/views');
app.set('view engine', 'ejs');

// routes
app.use('/', profileRoutes);
app.use('/', commentRoutes);

app.use(errorHandler);

module.exports = app;
