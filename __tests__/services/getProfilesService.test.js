const ProfileModel = require('../../src/models/profile');
const getProfilesService = require('../../src/services/getProfilesService');

describe('Get Profiles Service', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('should get all profiles', async () => {
        const id1 = 'f87a7517-b727-420c-9e44-ec5613ef5b20';
        const id2 = '8fb08956-cc36-4768-8cd8-c21c023d70cb';

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
            psyche: 'psy'
        };

        const profileData2 = {
            id: id2,
            name: 'John 2',
            description: 'desc',
            mbti: 'INTP',
            enneagram: 'ennea',
            variant: 'var',
            tritype: 1,
            socionics: 'soci',
            sloan: 'sloan',
            psyche: 'psy'
        };

        ProfileModel.find = jest.fn().mockResolvedValue([profileData1, profileData2]);

        const profiles = await getProfilesService({ query: {} });

        expect(profiles).toHaveLength(2);
    });

    test('should get an empty list of profiles', async () => {
        ProfileModel.find = jest.fn().mockResolvedValue([]);

        const profiles = await getProfilesService({ query: {} });

        expect(profiles).toHaveLength(0);
    });
});
