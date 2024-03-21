'use strict';

const express = require('express');
const { validateIdParam, validateProfileDataOnBody } = require('../middlewares/validate-requests');
const { removeIdFromCreateProfileData } = require('../middlewares/filter-requests');
const { isProfileCreated, isProfileWithNameCreated } = require('../middlewares/profile-exists');
const profileController = require('../controllers/profile-controller');

const router = express.Router();

router.get('/profiles', profileController.getProfiles);
router.get('/profiles/:id', validateIdParam, isProfileCreated, profileController.getProfile);
router.get('/:id', validateIdParam, isProfileCreated, profileController.getProfile);
router.post('/profiles', validateProfileDataOnBody, removeIdFromCreateProfileData, isProfileWithNameCreated, profileController.createProfile);

module.exports = router;
