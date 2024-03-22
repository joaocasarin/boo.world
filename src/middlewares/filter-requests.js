'use strict';

const removeIdFromCreateProfileData = (req, _, next) => {
    const { profileData } = req;

    if (profileData.hasOwnProperty('id')) {
        const {id, ...data} = profileData;

        req.profileData = data;
    }

    return next();
};

const removeIdFromCreateCommentData = (req, _, next) => {
    const { commentData } = req;

    if (commentData.hasOwnProperty('id')) {
        const {id, ...data} = commentData;

        req.commentData = data;
    }

    return next();
};

module.exports = {
    removeIdFromCreateCommentData,
    removeIdFromCreateProfileData
};