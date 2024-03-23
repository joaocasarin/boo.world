const CustomError = require('../../src/helpers/CustomError');
const ProfileModel = require('../../src/models/profile');
const getCommentsService = require('../../src/services/getCommentsService');

describe('Get Comments Service', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('should get all comment IDs from given profile ID', async () => {
        const id = 'f87a7517-b727-420c-9e44-ec5613ef5b20';
        const commentId = 'a3e28ca7-1a72-4ea9-a545-2359ef9d996e';

        const profile = {
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

        ProfileModel.findByID = jest.fn().mockResolvedValue(profile);

        const comments = await getCommentsService({ id, query: {} });

        expect(comments).toEqual(profile.comments);
    });

    test("should not get the profile's comments because profile does not exist", async () => {
        const id = 'f87a7517-b727-420c-9e44-ec5613ef5b20';

        ProfileModel.findByID = jest.fn().mockResolvedValue(null);

        const comment = await getCommentsService({ id, query: {} });

        expect(comment instanceof CustomError).toBeTruthy();
        expect(comment.message).toEqual(`Profile with Id [${id}] not found.`);
        expect(comment.status).toEqual(404);
    });
});
