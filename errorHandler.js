'use strict';

const errorHandler = async (error, _req, res, _next) => {
    return res.send({
        success: false,
        error
    });
};

module.exports = errorHandler;
