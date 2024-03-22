'use strict';

const CommentModel = require('../models/comment');

const isCommentCreated = async (req, _, next) => {
    const { id } = req;

    const comment = await CommentModel.findByID(id);

    if (!comment) return next({
        status: 404,
        message: `Comment with Id [${id}] not found.`
    });

    req.comment = comment;
    return next();
};

module.exports = {
    isCommentCreated
};
