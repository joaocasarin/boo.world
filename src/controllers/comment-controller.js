const ProfileModel = require('../models/profile');
const CommentModel = require('../models/comment');

class CommentController {
    async createComment(req, res, next) {
        const { id } = req;
        const commentData = req.body;

        try {
            const comment = await CommentModel.create(commentData);
            await ProfileModel.findByIDAndUpdateComments(id, comment.id);

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

        try {
            const comment = await CommentModel.findByIDAndReact(id, { profileId, reaction });

            return res.send({
                comment
            });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new CommentController();
