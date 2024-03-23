const { ZodError } = require('zod');
const CustomError = require('../helpers/CustomError');

// eslint-disable-next-line no-unused-vars
const errorHandler = async (error, _req, res, _next) => {
    if (error instanceof ZodError) {
        const errors = error.errors.map((e) => e.message);

        return res.status(500).send({
            success: false,
            errors
        });
    }

    if (error instanceof CustomError) {
        return res.status(error.status).send({
            success: false,
            errors: [error.message]
        });
    }

    return res.status(500).send({
        success: false,
        errors: 'Internal Server Error.'
    });
};

module.exports = errorHandler;
