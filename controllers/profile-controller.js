'use strict';

const ProfileModel = require('../models/profile');

class ProfileController {
    async getProfile(req, res) {
        const { profile } = req;
    
        return res.render('profile_template', {
            profile
        });
    }

    async createProfile(req, res, next) {
        const { profileData } = req;
        let profile;

        try {
            profile = await ProfileModel.create(profileData);
        } catch (error) {
            return next(error);
        }

        return res.send({
            profile
        });
    }
}

module.exports = new ProfileController();
