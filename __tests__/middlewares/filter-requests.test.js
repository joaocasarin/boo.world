'use strict';

const { removeIdFromCreateProfileData } = require('../../middlewares/filter-requests');

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
});