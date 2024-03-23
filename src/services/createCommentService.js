const CustomError = require('../helpers/CustomError');
const ProfileModel = require('../models/profile');
const CommentModel = require('../models/comment');

const createCommentService = async ({ id, commentData }) => {
    const profile = await ProfileModel.findByID(id);

    if (!profile) return new CustomError(404, `Profile with Id [${id}] not found.`);

    const comment = await CommentModel.create(commentData);

    await ProfileModel.updateOne(
        { id },
        {
            $push: { comments: comment.id }
        }
    );

    return comment;
};

module.exports = createCommentService;
