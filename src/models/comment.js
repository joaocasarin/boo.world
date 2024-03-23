'use strict';

const { model, Schema } = require('mongoose');
const { randomUUID } = require('crypto');
const CustomError = require('../helpers/CustomError');

const CommentSchema  = new Schema({
    id: {
        type: String,
        default: randomUUID,
        required: false,
        unique: true
    },
    authorId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    mbti: {
        type: String,
        required: true,
        match: /^[IE][SN][FT][PJ]$/
    },
    enneagram: {
        type: String,
        required: true,
        // match: /^([1-9]w[1-9])$/
    },
    zodiac: {
        type: String,
        required: true,
        // match: /^(SP|SO|SX)(\/(SP|SO|SX))*$/
    },
    reactions: [{
        type: String,
        ref: 'profile'
    }]
}, {
    statics: {
        findByID(id) {
            return this.findOne({ id });
        },
        findByProfileID(authorId) {
            return this.find({ authorId });
        },
        async findByIDAndReact(id, { profileId, reaction }) {
            const comment = await this.findOne({ id });

            if (!comment) throw new CustomError(404,`Comment with id [${id}] not found.`);

            const { reactions } = comment;

            const isCommentReactedByProfile = reactions.some(reactionId => reactionId === profileId);

            if (reaction === 'unlike' && isCommentReactedByProfile) {
                const newReactions = reactions.filter((reactionId) => reactionId !== profileId);

                return this.findOneAndUpdate({ id },{
                    $set: {
                        reactions: newReactions
                    }
                },{ new: true })
            }

            if (reaction === 'unlike' && !isCommentReactedByProfile) throw new CustomError(404, `Profile with id [${profileId}] haven't reacted to this comment yet.`);

            if (reaction === 'like' && isCommentReactedByProfile) throw new CustomError(409, `Profile with id [${profileId}] already reacted to this comment.`);

            return this.findOneAndUpdate({ id }, {
                $push: { reactions: profileId }
            }, { new: true });
        }
    }
});

module.exports = model('comment', CommentSchema);
