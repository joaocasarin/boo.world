const CustomError = require('../helpers/CustomError');
const updateCommentService = require('../services/updateCommentService');
const createCommentService = require('../services/createCommentService');
const Logger = require('../configs/logger');

class CommentController {
    async createComment(req, res, next) {
        const { id } = req;
        const commentData = req.body;

        try {
            const comment = await createCommentService({ id, commentData });

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

        const comment = await updateCommentService({ id, profileId, reaction });

        if (comment instanceof CustomError) next(comment);

        Logger.info(`Reacting to comment: ${JSON.stringify(comment)}`);
        return res.send({
            comment
        });
    }
}

module.exports = new CommentController();
