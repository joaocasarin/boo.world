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

        return res.status(201).send({
            profile
        });
    }

    async getProfiles(_, res) {
        const profiles = await ProfileModel.find({});
    
        return res.send({
            profiles
        });
    }

    async getComments(req, res, next) {
        const { id } = req;

        const profile = await ProfileModel.findByID(id);
        let comments;

        try {
            comments = await profile.populate({
                path: 'comments',
                model: 'comment',
                foreignField: 'id'
            });
        } catch (error) {
            return next(error);
        }
    
        return res.send({
            comments
        });
    }
}

module.exports = new ProfileController();
