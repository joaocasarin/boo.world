const ProfileModel = require('../models/profile');

const getProfilesService = async ({ query }) => {
    const profiles = await ProfileModel.find({});

    if (query.expand === 'true') {
        const expandedProfiles = await Promise.all(
            profiles.map((profile) =>
                profile.populate({
                    path: 'comments',
                    model: 'comment',
                    foreignField: 'id'
                })
            )
        );

        return expandedProfiles;
    }

    return profiles;
};

module.exports = getProfilesService;
