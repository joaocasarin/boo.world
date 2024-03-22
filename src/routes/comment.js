'use strict';

const express = require('express');
const { validateIdParam } = require('../middlewares/validate-requests');
const { isCommentCreated } = require('../middlewares/comment-exists');
const commentController = require('../controllers/comment-controller');

const router = express.Router();

router.put('/comments/:id/like', validateIdParam, isCommentCreated, commentController.likeComment);
router.put('/comments/:id/dislike', validateIdParam, isCommentCreated, commentController.dislikeComment);

module.exports = router;
