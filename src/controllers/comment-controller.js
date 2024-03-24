const CustomError = require('../helpers/CustomError');
const reactToCommentService = require('../services/reactToCommentService');
const createCommentService = require('../services/createCommentService');
const getProfileService = require('../services/getProfileService');
const Logger = require('../configs/logger');
const getCommentService = require('../services/getCommentService');

class CommentController {
    async createComment(req, res, next) {
        const { id } = req;
        const commentData = req.body;

        try {
            const profile = await getProfileService(id);

            if (profile instanceof CustomError) return next(profile);

            const comment = await createCommentService({ profile, commentData });

            if (comment instanceof CustomError) return next(comment);

            Logger.info(`Creating comment: ${JSON.stringify(comment)}`);
            return res.status(201).send({
                comment
            });
        } catch (error) {
            return next(error);
        }
    }

    async reactToComment(req, res, next) {
        const { id } = req;
        const { profileId, reaction } = req.body;

        let comment = await getCommentService(id);

        if (comment instanceof CustomError) return next(comment);

        comment = await reactToCommentService({ comment, profileId, reaction });

        if (comment instanceof CustomError) return next(comment);

        Logger.info(`Reacting to comment: ${JSON.stringify(comment)}`);
        return res.send({
            comment
        });
    }
}

module.exports = new CommentController();
