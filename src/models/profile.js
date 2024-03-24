const { model, Schema } = require('mongoose');
const { randomUUID } = require('crypto');

const ProfileSchema = new Schema(
    {
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
        variant: {
            type: String,
            required: false
        },
        tritype: {
            type: Number,
            required: false
        },
        socionics: {
            type: String,
            required: false
        },
        sloan: {
            type: String,
            required: false
        },
        psyche: {
            type: String,
            required: false
        },
        image: {
            type: String,
            default: 'https://soulverse.boo.world/images/1.png',
            required: false
        },
        comments: [
            {
                type: String,
                ref: 'comment'
            }
        ]
    },
    {
        statics: {
            findByID(id) {
                return this.findOne({ id });
            },
            findByName(name) {
                return this.findOne({ name });
            }
        },
        timestamps: true
    }
);

ProfileSchema.post('save', (error, doc, next) => {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error(`Name [${doc.name}] already in use.`));
    } else {
        next(error);
    }
});

module.exports = model('profile', ProfileSchema);
