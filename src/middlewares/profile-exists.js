'use strict';

const ProfileModel = require('../models/profile');

const isProfileWithNameCreated = async (req, _, next) => {
    const { name } = req.profileData;

    const profile = await ProfileModel.findByName(name);

    if (profile) return next({
        status: 409,
        message: `Profile with name [${name}] already created.`
    });

    return next();
};

const isProfileCreated = async (req, _, next) => {
    const { profileId } = req;

    const profile = await ProfileModel.findByID(profileId);

    if (!profile) return next({
        status: 404,
        message: `Profile with Id [${profileId}] not found.`
    });

    req.profile = profile;
    return next();
};

module.exports = {
    isProfileCreated,
    isProfileWithNameCreated
};
