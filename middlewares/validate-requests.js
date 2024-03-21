'use strict';

const { isUUIDv4 } = require('../helpers');

const validateIdParam = async (req, _res, next) => {
    const { params } = req;

    if (!isUUIDv4(params['id'])) return next(`Provided Id [${params['id']}] is not a UUIDv4.`);

    req.profileId = params['id'];
    return next();
};

module.exports = {
    validateIdParam
};
