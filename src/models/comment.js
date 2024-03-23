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
    likes: {
        type: Number,
        default: 0,
        required: false
    }
}, {
    statics: {
        findByID(id) {
            return this.findOne({ id });
        },
        findByIDAndLikeComment(id) {
            const comment = this.findOne({ id });

            if (!comment) throw new CustomError(404,`Comment with id [${id}] not found.`);

            return this.findOneAndUpdate({ id }, {
                $inc: { likes: 1 }
            }, { new: true });
        },
        findByIDAndDislikeComment(id) {
            const comment = this.findOne({ id });

            if (!comment) throw new Error({ status: 404, message: `Comment with id [${id}] not found.` });

            return this.findOneAndUpdate({ id }, {
                $inc: { likes: -1 }
            }, { new: true });
        }
    }
});

module.exports = model('comment', CommentSchema);
