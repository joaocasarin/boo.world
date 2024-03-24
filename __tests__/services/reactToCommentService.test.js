const CustomError = require('../../src/helpers/CustomError');
const CommentModel = require('../../src/models/comment');
const reactToCommentService = require('../../src/services/reactToCommentService');

describe('React To Comment Service', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should not unlike a comment because the profileId has not reacted to it yet', async () => {
        const id = 'a3e28ca7-1a72-4ea9-a545-2359ef9d996e';
        const profileId = '8fb08956-cc36-4768-8cd8-c21c023d70cb';
        const reaction = 'unlike';

        const commentData = {
            id,
            title: 'New Comment',
            authorId: profileId,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            reactions: [],
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:50:32.434Z'
        };

        const comment = await reactToCommentService({ comment: commentData, profileId, reaction });

        expect(comment instanceof CustomError).toBeTruthy();
        expect(comment.message).toEqual(
            `Profile with id [${profileId}] haven't reacted to this comment yet.`
        );
        expect(comment.status).toEqual(404);
    });

    test('should not like a comment because the profileId has already reacted to it', async () => {
        const id = 'a3e28ca7-1a72-4ea9-a545-2359ef9d996e';
        const profileId = '8fb08956-cc36-4768-8cd8-c21c023d70cb';
        const reaction = 'like';

        const commentData = {
            id,
            title: 'New Comment',
            authorId: profileId,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            reactions: [profileId],
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:50:32.434Z'
        };

        const comment = await reactToCommentService({ comment: commentData, profileId, reaction });

        expect(comment instanceof CustomError).toBeTruthy();
        expect(comment.message).toEqual(
            `Profile with id [${profileId}] already reacted to this comment.`
        );
        expect(comment.status).toEqual(409);
    });

    test('should unlike a comment with given profileId', async () => {
        const id = 'a3e28ca7-1a72-4ea9-a545-2359ef9d996e';
        const profileId = '8fb08956-cc36-4768-8cd8-c21c023d70cb';
        const reaction = 'unlike';

        const commentData = {
            id,
            title: 'New Comment',
            authorId: profileId,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            reactions: [profileId],
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:50:32.434Z'
        };

        CommentModel.findOneAndUpdate = jest.fn().mockResolvedValue({
            ...commentData,
            reactions: commentData.reactions.filter((reactionId) => reactionId !== profileId)
        });

        const comment = await reactToCommentService({ comment: commentData, profileId, reaction });

        expect(comment.reactions).toHaveLength(0);
    });

    test('should like a comment with given profileId', async () => {
        const id = 'a3e28ca7-1a72-4ea9-a545-2359ef9d996e';
        const profileId = '8fb08956-cc36-4768-8cd8-c21c023d70cb';
        const reaction = 'like';

        const commentData = {
            id,
            title: 'New Comment',
            authorId: profileId,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            reactions: [],
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:50:32.434Z'
        };

        CommentModel.findOneAndUpdate = jest.fn().mockResolvedValue({
            ...commentData,
            reactions: [profileId]
        });

        const comment = await reactToCommentService({ comment: commentData, profileId, reaction });

        expect(comment.reactions).toHaveLength(1);
    });
});
