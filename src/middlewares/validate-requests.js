'use strict';

const ProfileZodSchema = require('../schemas/profile');
const { isUUIDv4 } = require('../helpers');

const validateProfileDataOnBody = (req, _, next) => {
    const { body } = req;

    const result = ProfileZodSchema.safeParse(body);

    if (!result.success) {
        return next(result.error);
    }

    req.profileData = body;
    return next();
};

const validateIdParam = (req, _, next) => {
    const { params } = req;

    if (!isUUIDv4(params['id'])) return next({
        status: 400,
        message: `Provided Id [${params['id']}] is not a UUIDv4.`
    });

    req.id = params['id'];
    return next();
};

module.exports = {
    validateIdParam,
    validateProfileDataOnBody
};
