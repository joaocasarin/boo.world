const CustomError = require('../helpers/CustomError');
const CommentModel = require('../models/comment');

const updateCommentService = async ({ id, profileId, reaction }) => {
    const comment = await CommentModel.findByID(id);

    if (!comment) return new CustomError(404, `Comment with Id [${id}] not found.`);

    const { reactions } = comment;

    const isCommentReactedByProfile = reactions.some((reactionId) => reactionId === profileId);

    if (reaction === 'unlike' && !isCommentReactedByProfile)
        return new CustomError(
            404,
            `Profile with id [${profileId}] haven't reacted to this comment yet.`
        );

    if (reaction === 'like' && isCommentReactedByProfile)
        return new CustomError(
            409,
            `Profile with id [${profileId}] already reacted to this comment.`
        );

    if (reaction === 'unlike' && isCommentReactedByProfile) {
        const newReactions = reactions.filter((reactionId) => reactionId !== profileId);

        const updatedComment = await CommentModel.findOneAndUpdate(
            { id },
            {
                $set: {
                    reactions: newReactions
                }
            },
            { new: true }
        );

        return updatedComment;
    }

    const updatedComment = await CommentModel.findOneAndUpdate(
        { id },
        {
            $push: { reactions: profileId }
        },
        { new: true }
    );

    return updatedComment;
};

module.exports = updateCommentService;
