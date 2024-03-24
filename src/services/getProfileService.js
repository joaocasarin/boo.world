const CustomError = require('../helpers/CustomError');
const ProfileModel = require('../models/profile');

const getProfileService = async (id) => {
    const profile = await ProfileModel.findByID(id);

    if (!profile) return new CustomError(404, `Profile with Id [${id}] not found.`);

    return profile;
};

module.exports = getProfileService;
