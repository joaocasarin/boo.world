const express = require('express');
const { validateIdParam } = require('../middlewares/validate-requests');
const { isCommentCreated } = require('../middlewares/comment-exists');
const commentController = require('../controllers/comment-controller');

const router = express.Router();

router.put(
    '/comments/:id/react',
    validateIdParam,
    isCommentCreated,
    commentController.reactToComment
);

module.exports = router;
