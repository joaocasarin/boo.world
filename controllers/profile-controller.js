'use strict';

class ProfileController {
    async getProfile(req, res) {
        const { profile } = req;
    
        return res.render('profile_template', {
            profile
        });
    }
}

module.exports = new ProfileController();
