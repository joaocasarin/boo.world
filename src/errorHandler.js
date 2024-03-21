'use strict';

const errorHandler = async (error, _req, res, _next) => {
    return res.status(500).send({
        success: false,
        error
    });
};

module.exports = errorHandler;
