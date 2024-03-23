const CustomError = require('../helpers/CustomError');
const ProfileModel = require('../models/profile');

const createProfileService = async ({ profileData }) => {
    const possibleProfile = await ProfileModel.findByName(profileData.name);

    if (possibleProfile)
        return new CustomError(409, `Profile with name [${profileData.name}] already created.`);

    const profile = await ProfileModel.create(profileData);

    return profile;
};

module.exports = createProfileService;
