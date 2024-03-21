'use strict';

const ProfileModel = require('../models/profile');

const isProfileCreated = async (req, _, next) => {
    const { profileId } = req;

    const profile = await ProfileModel.findByID(profileId);

    if (!profile) return next(`Profile with Id [${profileId}] not found.`);

    req.profile = profile;
    return next();
};

module.exports = {
    isProfileCreated
};
