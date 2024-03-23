const express = require('express');
const { validateIdParam } = require('../middlewares/validate-requests');
const commentController = require('../controllers/comment-controller');

const router = express.Router();

router.put('/comments/:id/react', validateIdParam, commentController.reactToComment);

module.exports = router;
