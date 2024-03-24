const ProfileModel = require('../models/profile');
const CommentModel = require('../models/comment');

const createCommentService = async ({ profile, commentData }) => {
    const comment = await CommentModel.create(commentData);

    await ProfileModel.updateOne(
        { id: profile.id },
        {
            $push: { comments: comment.id }
        }
    );

    return comment;
};

module.exports = createCommentService;
