const CustomError = require('../../src/helpers/CustomError');
const ProfileModel = require('../../src/models/profile');
const getProfileService = require('../../src/services/getProfileService');

describe('Get Profile Service', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('should get profile with given id', async () => {
        const id = 'f87a7517-b727-420c-9e44-ec5613ef5b20';
        const commentId = 'a3e28ca7-1a72-4ea9-a545-2359ef9d996e';

        const profileData = {
            id,
            name: 'John',
            description: 'desc',
            mbti: 'INTP',
            enneagram: 'ennea',
            variant: 'var',
            tritype: 1,
            socionics: 'soci',
            sloan: 'sloan',
            psyche: 'psy',
            comments: [commentId]
        };

        const commentData = {
            id: commentId,
            title: 'New Comment',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123'
        };

        ProfileModel.findByID = jest.fn().mockResolvedValue({
            populate: () => ({ ...profileData, comments: [commentData] })
        });

        const profile = await getProfileService({ id });

        expect(profile.comments).toEqual([commentData]);
    });

    test('should not get the profile because it does not exist', async () => {
        const id = 'f87a7517-b727-420c-9e44-ec5613ef5b20';

        ProfileModel.findByID = jest.fn().mockResolvedValue(null);

        const comment = await getProfileService({ id });

        expect(comment instanceof CustomError).toBeTruthy();
        expect(comment.message).toEqual(`Profile with Id [${id}] not found.`);
        expect(comment.status).toEqual(404);
    });
});
