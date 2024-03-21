'use strict';

const removeIdFromCreateProfileData = (req, _, next) => {
    const { profileData } = req;

    if (profileData.hasOwnProperty('id')) {
        const {id, ...data} = profileData;

        req.profileData = data;
    }

    return next();
};

module.exports = {
    removeIdFromCreateProfileData
};