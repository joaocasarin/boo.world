const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const Logger = require('../configs/logger');

const connectToMongoDB = async () => {
    try {
        const mongoServer = await MongoMemoryServer.create();

        await mongoose.connect(mongoServer.getUri());

        Logger.info('Connected to database successfully!');
    } catch (error) {
        Logger.error(`Could not connect to database. Error: ${JSON.stringify(error)}`);
        process.exit(1);
    }
};

module.exports = connectToMongoDB;
