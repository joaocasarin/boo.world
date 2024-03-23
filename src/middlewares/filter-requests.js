const removeIdFromCreateProfileData = (req, _, next) => {
    const { profileData } = req;

    if (Object.prototype.hasOwnProperty.call(profileData, 'id')) {
        const { id, ...data } = profileData;

        req.profileData = data;
    }

    return next();
};

const removeIdFromCreateCommentData = (req, _, next) => {
    const { commentData } = req;

    if (Object.prototype.hasOwnProperty.call(commentData, 'id')) {
        const { id, ...data } = commentData;

        req.commentData = data;
    }

    return next();
};

module.exports = {
    removeIdFromCreateCommentData,
    removeIdFromCreateProfileData
};
