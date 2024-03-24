const CustomError = require('../helpers/CustomError');
const CommentModel = require('../models/comment');

const reactToCommentService = async ({ comment, profileId, reaction }) => {
    const { reactions } = comment;

    const isCommentReactedByProfile = reactions.some((reactionId) => reactionId === profileId);

    if (reaction === 'unlike' && !isCommentReactedByProfile)
        return new CustomError(
            404,
            `Profile with id [${profileId}] haven't reacted to this comment yet.`
        );

    if (reaction === 'unlike' && isCommentReactedByProfile) {
        const newReactions = reactions.filter((reactionId) => reactionId !== profileId);

        const updatedComment = await CommentModel.findOneAndUpdate(
            { id: comment.id },
            {
                $set: {
                    reactions: newReactions
                }
            },
            { new: true }
        );

        return updatedComment;
    }

    if (reaction === 'like' && isCommentReactedByProfile)
        return new CustomError(
            409,
            `Profile with id [${profileId}] already reacted to this comment.`
        );

    const updatedComment = await CommentModel.findOneAndUpdate(
        { id: comment.id },
        {
            $push: { reactions: profileId }
        },
        { new: true }
    );

    return updatedComment;
};

module.exports = reactToCommentService;
