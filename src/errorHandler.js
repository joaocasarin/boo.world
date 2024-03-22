'use strict';

const { ZodError } = require("zod");

const errorHandler = async (error, _req, res, _next) => {

    if (error instanceof ZodError) {
        console.log(error.errors[0]);

        const errors = error.errors.map(e => e.message);

        return res.status(500).send({
            success: false,
            errors
        });
    }

    return res.status(error.status).send({
        success: false,
        errors: [error.message]
    });
};

module.exports = errorHandler;
