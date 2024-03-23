const CustomError = require('../../src/helpers/CustomError');
const ProfileModel = require('../../src/models/profile');
const createProfileService = require('../../src/services/createProfileService');

describe('Create Profile Service', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('should create a profile with given data', async () => {
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

        ProfileModel.findByName = jest.fn().mockResolvedValue(null);

        ProfileModel.create = jest.fn().mockResolvedValue(profileData);

        const profile = await createProfileService({ profileData });

        expect(profile).toEqual(profileData);
    });

    test('should not create a profile because it already exists', async () => {
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

        ProfileModel.findByName = jest.fn().mockResolvedValue(profileData);

        const profile = await createProfileService({ profileData });

        expect(profile instanceof CustomError).toBeTruthy();
        expect(profile.message).toEqual(`Profile with name [${profileData.name}] already created.`);
        expect(profile.status).toEqual(409);
    });
});
