const express = require('express');
const {
    validateIdParam,
    validateProfileDataOnBody,
    validateCommentDataOnBody
} = require('../middlewares/validate-requests');
const {
    removeIdFromCreateProfileData,
    removeIdFromCreateCommentData
} = require('../middlewares/filter-requests');
const profileController = require('../controllers/profile-controller');
const commentController = require('../controllers/comment-controller');

const router = express.Router();

router.get('/profiles', profileController.getProfiles);
router.get('/profiles/:id/comments', validateIdParam, profileController.getComments);
router.get('/profiles/:id', validateIdParam, profileController.getProfile);
router.get('/:id', validateIdParam, profileController.getProfile);

router.post(
    '/profiles',
    validateProfileDataOnBody,
    removeIdFromCreateProfileData,
    profileController.createProfile
);
router.post(
    '/profiles/:id/comments',
    validateIdParam,
    validateCommentDataOnBody,
    removeIdFromCreateCommentData,
    commentController.createComment
);

module.exports = router;
