const CustomError = require('../../src/helpers/CustomError');
const ProfileModel = require('../../src/models/profile');
const getProfileService = require('../../src/services/getProfileService');

describe('Get Profile Service', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should get profile with given id', async () => {
        const id = 'f87a7517-b727-420c-9e44-ec5613ef5b20';

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
            psyche: 'psy'
        };

        ProfileModel.findByID = jest.fn().mockResolvedValue(profileData);

        const profile = await getProfileService(id);

        expect(profile).toEqual(profileData);
    });

    test('should not get the profile because it does not exist', async () => {
        const id = 'f87a7517-b727-420c-9e44-ec5613ef5b20';

        ProfileModel.findByID = jest.fn().mockResolvedValue(null);

        const profile = await getProfileService(id);

        expect(profile instanceof CustomError).toBeTruthy();
        expect(profile.message).toEqual(`Profile with Id [${id}] not found.`);
        expect(profile.status).toEqual(404);
    });
});
