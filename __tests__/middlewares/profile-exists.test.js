const CustomError = require('../../src/helpers/CustomError');
const {
    isProfileCreated,
    isProfileWithNameCreated
} = require('../../src/middlewares/profile-exists');
const ProfileModel = require('../../src/models/profile');

describe('Profile exists tests', () => {
    test('should add profile with given id to req if it exists', async () => {
        ProfileModel.findByID = jest.fn().mockResolvedValue({
            id: '1fdc5d72-aee1-44f2-a557-ee2200d4e13a',
            name: 'John'
        });

        const req = {
            profileId: '1fdc5d72-aee1-44f2-a557-ee2200d4e13a'
        };

        await isProfileCreated(req, null, () => {});

        expect(req).toHaveProperty('profile');
        expect(req.profile).toHaveProperty('id');
        expect(req.profile).toHaveProperty('name');
        expect(req.profile.id).toEqual('1fdc5d72-aee1-44f2-a557-ee2200d4e13a');
        expect(req.profile.name).toEqual('John');
    });

    test('should not add profile with given id to req if it does not exist', async () => {
        ProfileModel.findByID = jest.fn().mockResolvedValue(null);

        const req = {
            id: '1fdc5d72-aee1-44f2-a557-ee2200d4e13a'
        };

        const result = await isProfileCreated(req, null, (text) => text);

        expect(req).not.toHaveProperty('profile');
        expect(result instanceof CustomError).toBeTruthy();
        expect(result.message).toEqual(
            'Profile with Id [1fdc5d72-aee1-44f2-a557-ee2200d4e13a] not found.'
        );
        expect(result.status).toEqual(404);
    });

    test('should not find profile with given name', async () => {
        ProfileModel.findByName = jest.fn().mockResolvedValue(null);

        const req = {
            profileData: {
                name: 'John'
            }
        };

        const result = await isProfileWithNameCreated(req, null, (text) => text);

        expect(result).toBeUndefined();
    });

    test('should find profile with given name', async () => {
        ProfileModel.findByName = jest.fn().mockResolvedValue({
            id: '1fdc5d72-aee1-44f2-a557-ee2200d4e13a',
            name: 'John'
        });

        const req = {
            profileData: {
                name: 'John'
            }
        };

        const result = await isProfileWithNameCreated(req, null, (text) => text);

        expect(result instanceof CustomError).toBeTruthy();
        expect(result.message).toEqual(
            `Profile with name [${req.profileData.name}] already created.`
        );
        expect(result.status).toEqual(409);
    });
});
