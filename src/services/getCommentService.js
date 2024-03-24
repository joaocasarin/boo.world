const CustomError = require('../helpers/CustomError');
const CommentModel = require('../models/comment');

const getCommentService = async (id) => {
    const comment = await CommentModel.findByID(id);

    if (!comment) return new CustomError(404, `Comment with Id [${id}] not found.`);

    return comment;
};

module.exports = getCommentService;
