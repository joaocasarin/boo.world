const CustomError = require('../../src/helpers/CustomError');
const CommentModel = require('../../src/models/comment');
const updateCommentService = require('../../src/services/updateCommentService');

describe('Update Comment Service', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test("should not update a comment's reaction because it does not exist", async () => {
        const id = 'a3e28ca7-1a72-4ea9-a545-2359ef9d996e';

        CommentModel.findByID = jest.fn().mockResolvedValue(null);

        const comment = await updateCommentService({ id, profileId: null, reaction: null });

        expect(comment instanceof CustomError).toBeTruthy();
        expect(comment.message).toEqual(`Comment with Id [${id}] not found.`);
        expect(comment.status).toEqual(404);
    });

    test('should not unlike a comment because the profileId has not reacted to it yet', async () => {
        const id = 'a3e28ca7-1a72-4ea9-a545-2359ef9d996e';
        const profileId = '8fb08956-cc36-4768-8cd8-c21c023d70cb';
        const reaction = 'unlike';

        const commentData = {
            title: 'New Comment',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            reactions: []
        };

        CommentModel.findByID = jest.fn().mockResolvedValue(commentData);

        const comment = await updateCommentService({ id, profileId, reaction });

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
            title: 'New Comment',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            reactions: [profileId]
        };

        CommentModel.findByID = jest.fn().mockResolvedValue(commentData);

        const comment = await updateCommentService({ id, profileId, reaction });

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
            title: 'New Comment',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            reactions: [profileId]
        };

        CommentModel.findByID = jest.fn().mockResolvedValue(commentData);

        CommentModel.findOneAndUpdate = jest
            .fn()
            .mockResolvedValue({ ...commentData, reactions: [] });

        const comment = await updateCommentService({ id, profileId, reaction });

        expect(comment.reactions).toHaveLength(0);
    });

    test('should like a comment with given profileId', async () => {
        const id = 'a3e28ca7-1a72-4ea9-a545-2359ef9d996e';
        const profileId = '8fb08956-cc36-4768-8cd8-c21c023d70cb';
        const reaction = 'like';

        const commentData = {
            title: 'New Comment',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            reactions: []
        };

        CommentModel.findByID = jest.fn().mockResolvedValue(commentData);

        CommentModel.findOneAndUpdate = jest
            .fn()
            .mockResolvedValue({ ...commentData, reactions: [profileId] });

        const comment = await updateCommentService({ id, profileId, reaction });

        expect(comment.reactions).toHaveLength(1);
    });
});
