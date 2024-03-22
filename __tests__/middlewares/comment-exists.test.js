'use strict';

const { isCommentCreated } = require('../../src/middlewares/comment-exists');
const CommentModel = require('../../src/models/comment');

describe('Comment exists tests', () => {
    test('should add comment with given id to req if it exists', async () => {
        CommentModel.findByID = jest.fn().mockResolvedValue({
            id: '1fdc5d72-aee1-44f2-a557-ee2200d4e13a',
            title: 'Comment 1'
        });
        
        const req = {
            id: '1fdc5d72-aee1-44f2-a557-ee2200d4e13a'
        };

        await isCommentCreated(req, null, (_) => {});

        expect(req).toHaveProperty('comment');
        expect(req.comment).toHaveProperty('id');
        expect(req.comment).toHaveProperty('title');
        expect(req.comment.id).toEqual('1fdc5d72-aee1-44f2-a557-ee2200d4e13a');
        expect(req.comment.title).toEqual('Comment 1');
    });

    test('should not add comment with given id to req if it does not exist', async () => {
        CommentModel.findByID = jest.fn().mockResolvedValue(null);
        
        const req = {
            id: '1fdc5d72-aee1-44f2-a557-ee2200d4e13a'
        };

        const result = await isCommentCreated(req, null, (text) => text);

        expect(req).not.toHaveProperty('comment');
        expect(result).toEqual({
            status: 404, 
            message: 'Comment with Id [1fdc5d72-aee1-44f2-a557-ee2200d4e13a] not found.'
        })
    });
});
