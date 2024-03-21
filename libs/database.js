'use strict';

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    try {
        const mongoServer = await MongoMemoryServer.create();

        await mongoose.connect(mongoServer.getUri());

        console.log('Connected to database successfully!');
    } catch (e) {
        console.error(`Could not connect to database. Error: ${e}`);
        process.exit(1);
    }
};

module.exports = connectToMongoDB