const morgan = require('morgan');
const Logger = require('./logger');

const stream = {
    write: (message) => Logger.http(message)
};

const skip = () => {
    const nodeEnv = process.env.NODE_ENV || 'development';
    return nodeEnv !== 'development';
};

const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream,
    skip
});

module.exports = morganMiddleware;
