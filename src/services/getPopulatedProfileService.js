const getPopulatedProfileService = async ({ profile, sortBy, filterBy }) => {
    const sort = {};

    if (sortBy === 'recent') sort.updatedAt = -1;

    const expandedProfile = await profile.populate({
        path: 'comments',
        model: 'comment',
        foreignField: 'id',
        options: { sort }
    });

    if (sortBy === 'best') {
        expandedProfile.comments.sort((a, b) => b.reactions.length - a.reactions.length);
    }

    if (filterBy) {
        expandedProfile.comments = expandedProfile.comments.filter((comment) => {
            if (filterBy === 'mbti') return !!comment.mbti;
            if (filterBy === 'enneagram') return !!comment.enneagram;
            if (filterBy === 'zodiac') return !!comment.zodiac;

            return true; // No filtering if filterBy is not one of the expected fields
        });
    }

    return expandedProfile.comments;
};

module.exports = getPopulatedProfileService;
