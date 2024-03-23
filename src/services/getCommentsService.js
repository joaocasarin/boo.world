const CustomError = require('../helpers/CustomError');
const ProfileModel = require('../models/profile');

const getCommentsService = async ({ id, query }) => {
    const profile = await ProfileModel.findByID(id);

    if (!profile) return new CustomError(404, `Profile with Id [${id}] not found.`);

    if (query.expand === 'true') {
        const { comments } = await profile.populate({
            path: 'comments',
            model: 'comment',
            foreignField: 'id'
        });

        return comments;
    }

    return profile.comments;
};

module.exports = getCommentsService;
