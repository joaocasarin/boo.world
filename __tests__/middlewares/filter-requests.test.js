const {
    removeIdFromCreateProfileData,
    removeIdFromCreateCommentData
} = require('../../src/middlewares/filter-requests');

describe('Filter requests tests', () => {
    test('should remove id from request body when creating a profile', () => {
        const req = {
            profileData: {
                id: 1,
                name: 'John'
            }
        };

        removeIdFromCreateProfileData(req, null, () => {});

        expect(req).not.toHaveProperty('id');
    });

    test('should remove id from request body when creating a comment', () => {
        const req = {
            commentData: {
                id: 1,
                title: 'Comment 1'
            }
        };

        removeIdFromCreateCommentData(req, null, () => {});

        expect(req).not.toHaveProperty('id');
    });
});
