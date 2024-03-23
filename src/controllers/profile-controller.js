const CustomError = require('../helpers/CustomError');
const createProfileService = require('../services/createProfileService');
const getCommentsService = require('../services/getCommentsService');
const getProfileService = require('../services/getProfileService');
const getProfilesService = require('../services/getProfilesService');

class ProfileController {
    async createProfile(req, res, next) {
        const { profileData } = req;
        try {
            const profile = await createProfileService({ profileData });

            if (profile instanceof CustomError) return next(profile);

            return res.status(201).send({
                profile
            });
        } catch (error) {
            return next(error);
        }
    }

    async getProfile(req, res, next) {
        const { id } = req;

        try {
            const profile = await getProfileService({ id });

            if (profile instanceof CustomError) return next(profile);

            return res.render('profile_template', {
                profile
            });
        } catch (error) {
            return next(error);
        }
    }

    async getProfiles(req, res, next) {
        const { query } = req;

        try {
            const profiles = await getProfilesService({ query });

            return res.send({
                profiles
            });
        } catch (error) {
            return next(error);
        }
    }

    async getComments(req, res, next) {
        const { id, query } = req;

        try {
            const comments = await getCommentsService({ id, query });

            if (comments instanceof CustomError) return next(comments);

            return res.send({
                comments
            });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new ProfileController();
