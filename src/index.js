const app = require('./app');
const connectToMongoDB = require('./libs/database');
const Logger = require('./configs/logger');

const port = process.env.PORT || 3000;

// connect to MongoDB database
connectToMongoDB();

// start server
app.listen(port, () => {
    Logger.info(`Express started. Listening on ${port}`);
});
