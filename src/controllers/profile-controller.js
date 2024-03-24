const CustomError = require('../helpers/CustomError');
const createProfileService = require('../services/createProfileService');
const getPopulatedCommentsService = require('../services/getPopulatedCommentsService');
const getProfileService = require('../services/getProfileService');
const getProfilesService = require('../services/getProfilesService');
const Logger = require('../configs/logger');

class ProfileController {
    async createProfile(req, res, next) {
        const { profileData } = req;
        try {
            const profile = await createProfileService(profileData);

            if (profile instanceof CustomError) return next(profile);

            Logger.info(`Creating profile: ${JSON.stringify(profile)}`);
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
            const profile = await getProfileService(id);

            if (profile instanceof CustomError) return next(profile);

            profile.comments = await getPopulatedCommentsService({ profile, sortBy: '' });

            if (profile.comments instanceof CustomError) return next(profile.comments);

            Logger.info(`Getting profile: ${JSON.stringify(profile)}`);
            return res.render('profile_template', {
                profile
            });
        } catch (error) {
            return next(error);
        }
    }

    async getProfileJson(req, res, next) {
        const { id, query } = req;
        const { sortBy } = query;

        try {
            const profile = await getProfileService(id);

            if (profile instanceof CustomError) return next(profile);

            profile.comments = await getPopulatedCommentsService({ profile, sortBy });

            if (profile.comments instanceof CustomError) return next(profile.comments);

            Logger.info(`Getting profile JSON: ${JSON.stringify(profile)}`);
            return res.send({
                profile
            });
        } catch (error) {
            return next(error);
        }
    }

    async getProfiles(req, res, next) {
        const { query } = req;
        const { sortBy } = query;

        try {
            const profiles = await getProfilesService();

            const expandedProfiles = await Promise.all(
                profiles.map((profile) => getPopulatedCommentsService({ profile, sortBy }))
            );

            Logger.info(`Getting all profiles: ${JSON.stringify(profiles)}`);
            return res.send({
                profiles: expandedProfiles
            });
        } catch (error) {
            return next(error);
        }
    }

    async getComments(req, res, next) {
        const { id, query } = req;
        const { sortBy } = query;

        try {
            const profile = await getProfileService(id);

            if (profile instanceof CustomError) return next(profile);

            const comments = await getPopulatedCommentsService({ profile, sortBy });

            if (comments instanceof CustomError) return next(comments);

            Logger.info(`Getting profile comments: ID: ${id} - ${JSON.stringify(comments)}`);
            return res.send({
                comments
            });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new ProfileController();
