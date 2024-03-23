const CustomError = require('../../src/helpers/CustomError');
const CommentModel = require('../../src/models/comment');
const ProfileModel = require('../../src/models/profile');
const createCommentService = require('../../src/services/createCommentService');

describe('Create Comment Service', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('should create a comment for given profile id', async () => {
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
            psyche: 'psy'
        };

        const commentData = {
            title: 'New Comment',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123'
        };

        ProfileModel.findByID = jest.fn().mockResolvedValue(profile);

        CommentModel.create = jest.fn().mockResolvedValue(commentData);

        ProfileModel.updateOne = jest.fn().mockImplementation(() => {
            profile.comments = [commentId];
        });

        await createCommentService({ id, commentData });

        expect(profile).toHaveProperty('comments');
        expect(profile.comments).toHaveLength(1);
    });

    test('should not create a comment because profile does not exist', async () => {
        const id = 'f87a7517-b727-420c-9e44-ec5613ef5b20';

        ProfileModel.findByID = jest.fn().mockResolvedValue(null);

        const comment = await createCommentService({ id, commentData: {} });

        expect(comment instanceof CustomError).toBeTruthy();
        expect(comment.message).toEqual(`Profile with Id [${id}] not found.`);
        expect(comment.status).toEqual(404);
    });
});
