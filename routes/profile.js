'use strict';

const express = require('express');
const { validateIdParam } = require('../middlewares/validate-requests');
const { isProfileCreated } = require('../middlewares/profile-exists');
const profileController = require('../controllers/profile-controller');
const router = express.Router();

router.get('/:id', validateIdParam, isProfileCreated, profileController.getProfile);

module.exports = router;
