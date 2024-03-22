'use strict';

const ProfileModel = require('../models/profile');
const CommentModel = require('../models/comment');

class CommentController {
    async createComment(req, res, next) {
        const { id } = req;
        const commentData = req.body;

        let comment;

        try {
            comment = await CommentModel.create(commentData);
            await ProfileModel.findByIDAndUpdateComments(id, comment.id);
        } catch (error) {
            return next(error);
        }

        return res.status(201).send({
            comment
        });
    }

    async likeComment(req, res, next) {
        const { id } = req;

        let comment;

        try {
            comment = await CommentModel.findByIDAndLikeComment(id);
        } catch (error) {
            return next(error);
        }

        return res.send({
            comment
        });
    }

    async dislikeComment(req, res, next) {
        const { id } = req;

        let comment;

        try {
            comment = await CommentModel.findByIDAndDislikeComment(id);
        } catch (error) {
            return next(error);
        }

        return res.send({
            comment
        });
    }
}

module.exports = new CommentController();
