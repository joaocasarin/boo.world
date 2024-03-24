const CustomError = require('../../src/helpers/CustomError');
const CommentModel = require('../../src/models/comment');
const getCommentService = require('../../src/services/getCommentService');

describe('Get Comment Service', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should get comment with given id', async () => {
        const id = 'f87a7517-b727-420c-9e44-ec5613ef5b20';
        const profileId = 'a87a7517-b727-420c-9e44-ec5613ef5b21';

        const commentData = {
            id,
            title: 'Comment 1',
            authorId: profileId,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:50:32.434Z'
        };

        CommentModel.findByID = jest.fn().mockResolvedValue(commentData);

        const comment = await getCommentService(id);

        expect(comment).toEqual(commentData);
    });

    test('should not get the comment because it does not exist', async () => {
        const id = 'f87a7517-b727-420c-9e44-ec5613ef5b20';

        CommentModel.findByID = jest.fn().mockResolvedValue(null);

        const comment = await getCommentService(id);

        expect(comment instanceof CustomError).toBeTruthy();
        expect(comment.message).toEqual(`Comment with Id [${id}] not found.`);
        expect(comment.status).toEqual(404);
    });
});
