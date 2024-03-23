'use strict';

const { model, Schema } = require('mongoose');
const { randomUUID } = require('crypto');
const CustomError = require('../helpers/CustomError');

const ProfileSchema  = new Schema({
    id: {
        type: String,
        default: randomUUID,
        required: false,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
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
    variant: {
        type: String,
        required: true,
        // match: /^(SP|SO|SX)(\/(SP|SO|SX))*$/
    },
    tritype: {
        type: Number,
        required: true,
        // match: /^\d{1,2}[w]?\d{1,2}[w]?\d{1,2}$/
    },
    socionics: {
        type: String,
        required: true
    },
    sloan: {
        type: String,
        required: true
    },
    psyche: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://soulverse.boo.world/images/1.png",
        required: false
    },
    comments: [{
        type: String,
        ref: 'comment'
    }]
}, {
    statics: {
        findByID(id) {
            return this.findOne({ id });
        },
        findByName(name) {
            return this.findOne({ name });
        },
        async findByIDAndUpdateComments(id, commentId) {
            const profile = await this.findOne({ id });

            if (!profile) throw new CustomError(404, `Profile with id [${id}] not found.`);

            return this.findOneAndUpdate({ id }, {
                $push: { comments: commentId }
            }, { new: true });
        }
    }
});

ProfileSchema.post('save', (error, doc, next) => {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error(`Name [${doc.name}] already in use.`));
    } else {
        next(error);
    }
});

module.exports = model('profile', ProfileSchema);
