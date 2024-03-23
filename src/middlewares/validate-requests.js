'use strict';

const ProfileZodSchema = require('../schemas/profile');
const CommentZodSchema = require('../schemas/comment');
const { isUUIDv4 } = require('../helpers/uuidVerification');
const CustomError = require('../helpers/CustomError');

const validateProfileDataOnBody = (req, _, next) => {
    const { body } = req;

    const result = ProfileZodSchema.safeParse(body);

    if (!result.success) {
        return next(result.error);
    }

    req.profileData = body;
    return next();
};

const validateCommentDataOnBody = (req, _, next) => {
    const { body } = req;

    const result = CommentZodSchema.safeParse(body);

    if (!result.success) {
        return next(result.error);
    }

    req.commentData = body;
    return next();
};

const validateIdParam = (req, _, next) => {
    const { params } = req;

    if (!isUUIDv4(params['id'])) return next(new CustomError(400, `Provided Id [${params['id']}] is not a UUIDv4.`));

    req.id = params['id'];
    return next();
};

module.exports = {
    validateIdParam,
    validateCommentDataOnBody,
    validateProfileDataOnBody
};
