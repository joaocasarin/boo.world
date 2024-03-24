const { model, Schema } = require('mongoose');
const { randomUUID } = require('crypto');

const CommentSchema = new Schema(
    {
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
            required: false,
            match: /^[IE][SN][FT][PJ]$/
        },
        enneagram: {
            type: String,
            required: false
            // match: /^([1-9]w[1-9])$/
        },
        zodiac: {
            type: String,
            required: false
            // match: /^(SP|SO|SX)(\/(SP|SO|SX))*$/
        },
        reactions: [
            {
                type: String,
                ref: 'profile'
            }
        ]
    },
    {
        statics: {
            findByID(id) {
                return this.findOne({ id });
            },
            findByProfileID(authorId) {
                return this.find({ authorId });
            }
        },
        timestamps: true
    }
);

module.exports = model('comment', CommentSchema);
