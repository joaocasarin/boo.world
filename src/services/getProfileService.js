const CustomError = require('../helpers/CustomError');
const ProfileModel = require('../models/profile');

const getProfileService = async ({ id }) => {
    let profile = await ProfileModel.findByID(id);

    if (!profile) return new CustomError(404, `Profile with Id [${id}] not found.`);

    profile = profile.populate({
        path: 'comments',
        model: 'comment',
        foreignField: 'id'
    });

    return profile;
};

module.exports = getProfileService;
