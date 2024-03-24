const ProfileModel = require('../models/profile');

const getProfilesService = async () => {
    const profiles = await ProfileModel.find({});

    return profiles;
};

module.exports = getProfilesService;
