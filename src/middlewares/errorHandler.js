const { ZodError } = require('zod');
const CustomError = require('../helpers/CustomError');
const Logger = require('../configs/logger');

// eslint-disable-next-line no-unused-vars
const errorHandler = async (error, _req, res, _next) => {
    if (error instanceof ZodError) {
        const errors = error.errors.map((e) => e.message);

        Logger.error(`An error occurred: Zod: ${JSON.stringify(errors)}`);
        return res.status(400).send({
            success: false,
            errors
        });
    }

    if (error instanceof CustomError) {
        Logger.error(`An error occurred: CustomError: ${JSON.stringify([error.message])}`);
        return res.status(error.status).send({
            success: false,
            errors: [error.message]
        });
    }

    Logger.error(`An error occurred: InternalServerError: ${JSON.stringify(error)}`);
    return res.status(500).send({
        success: false,
        errors: 'Internal Server Error.'
    });
};

module.exports = errorHandler;
