const CustomError = require('../helpers/CustomError');
const ProfileModel = require('../models/profile');

const isProfileWithNameCreated = async (req, _, next) => {
    const { name } = req.profileData;

    const profile = await ProfileModel.findByName(name);

    if (profile) return next(new CustomError(409, `Profile with name [${name}] already created.`));

    return next();
};

const isProfileCreated = async (req, _, next) => {
    const { id } = req;

    const profile = await ProfileModel.findByID(id);

    if (!profile) return next(new CustomError(404, `Profile with Id [${id}] not found.`));

    req.profile = profile;
    return next();
};

module.exports = {
    isProfileCreated,
    isProfileWithNameCreated
};
