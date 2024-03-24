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
            required: false
        },
        comment: {
            type: String,
            required: false
        },
        mbti: {
            type: String,
            required: false
        },
        enneagram: {
            type: String,
            required: false
        },
        zodiac: {
            type: String,
            required: false
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
