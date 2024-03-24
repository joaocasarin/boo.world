const CommentModel = require('../../src/models/comment');
const ProfileModel = require('../../src/models/profile');
const createCommentService = require('../../src/services/createCommentService');

describe('Create Comment Service', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should create a comment for given profile id', async () => {
        const id = 'f87a7517-b727-420c-9e44-ec5613ef5b20';
        const profileId = 'a3e28ca7-1a72-4ea9-a545-2359ef9d996e';

        const profile = {
            id: profileId,
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
            id,
            title: 'New Comment',
            authorId: profileId,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:50:32.434Z'
        };

        CommentModel.create = jest.fn().mockResolvedValue(commentData);

        ProfileModel.updateOne = jest.fn().mockImplementation(() => {
            profile.comments = [id];
        });

        const comment = await createCommentService({ profile, commentData });

        expect(profile).toHaveProperty('comments');
        expect(profile.comments).toEqual([id]);
        expect(comment).toEqual(commentData);
    });
});
