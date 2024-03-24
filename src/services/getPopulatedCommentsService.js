const getPopulatedCommentsService = async ({ profile, sortBy }) => {
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

    return expandedProfile.comments;
};

module.exports = getPopulatedCommentsService;
