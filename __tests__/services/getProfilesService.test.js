const ProfileModel = require('../../src/models/profile');
const getProfilesService = require('../../src/services/getProfilesService');

describe('Get Profiles Service', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should get all profiles', async () => {
        const id1 = 'f87a7517-b727-420c-9e44-ec5613ef5b20';
        const id2 = '8fb08956-cc36-4768-8cd8-c21c023d70cb';
        const commentId1 = 'a3e28ca7-1a72-4ea9-a545-2359ef9d996e';
        const commentId2 = 'b3e28ca7-1a72-4ea9-a545-2359ef9d996d';

        const profileData1 = {
            id: id1,
            name: 'John',
            description: 'desc',
            mbti: 'INTP',
            enneagram: 'ennea',
            variant: 'var',
            tritype: 1,
            socionics: 'soci',
            sloan: 'sloan',
            psyche: 'psy',
            comments: [commentId1]
        };

        const profileData2 = {
            id: id2,
            name: 'Peter',
            description: 'desc',
            mbti: 'INTP',
            enneagram: 'ennea',
            variant: 'var',
            tritype: 1,
            socionics: 'soci',
            sloan: 'sloan',
            psyche: 'psy',
            comments: [commentId1, commentId2]
        };

        ProfileModel.find = jest.fn().mockResolvedValue([profileData1, profileData2]);

        const profiles = await getProfilesService();

        expect(profiles).toHaveLength(2);
        expect(profiles[0]).toEqual(profileData1);
        expect(profiles[1]).toEqual(profileData2);
    });

    test('should get an empty list of profiles', async () => {
        ProfileModel.find = jest.fn().mockResolvedValue([]);

        const profiles = await getProfilesService();

        expect(profiles).toHaveLength(0);
    });
});
