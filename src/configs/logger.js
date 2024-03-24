const winston = require('winston');

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

const level = () => {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const isDevelopment = nodeEnv === 'development';
    return isDevelopment ? 'debug' : 'warn';
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
};

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const silent = process.env.NODE_ENV === 'test';

const transports = [
    new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize({ all: true })),
        silent
    }),
    new winston.transports.File({
        level: 'error',
        filename: 'logs/error.log'
    }),
    new winston.transports.File({
        level: 'warn',
        filename: 'logs/warn.log',
        silent
    }),
    new winston.transports.File({
        level: 'info',
        filename: 'logs/info.log',
        silent
    }),
    new winston.transports.File({
        level: 'http',
        filename: 'logs/http.log',
        silent
    }),
    new winston.transports.File({
        level: 'debug',
        filename: 'logs/debug.log',
        silent
    })
];

const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports
});

module.exports = Logger;
