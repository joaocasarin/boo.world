'use strict';

const express = require('express');
const { validateIdParam, validateProfileDataOnBody, validateCommentDataOnBody } = require('../middlewares/validate-requests');
const { removeIdFromCreateProfileData, removeIdFromCreateCommentData } = require('../middlewares/filter-requests');
const { isProfileCreated, isProfileWithNameCreated } = require('../middlewares/profile-exists');
const profileController = require('../controllers/profile-controller');
const commentController = require('../controllers/comment-controller');

const router = express.Router();

router.get('/profiles', profileController.getProfiles);
router.get('/profiles/:id/comments', validateIdParam, isProfileCreated, profileController.getComments);
router.get('/profiles/:id', validateIdParam, isProfileCreated, profileController.getProfile);
router.get('/:id', validateIdParam, isProfileCreated, profileController.getProfile);

router.post('/profiles', validateProfileDataOnBody, removeIdFromCreateProfileData, isProfileWithNameCreated, profileController.createProfile);
router.post('/profiles/:id/comments', validateIdParam, isProfileCreated, validateCommentDataOnBody, removeIdFromCreateCommentData, commentController.createComment);

module.exports = router;
