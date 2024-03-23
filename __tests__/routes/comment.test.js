const { MongoMemoryServer } = require('mongodb-memory-server');
const { default: mongoose } = require('mongoose');
const supertest = require('supertest');
const app = require('../../src/app');
const CommentModel = require('../../src/models/comment');

describe('Comment routes', () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    beforeEach(async () => {
        await mongoose.connection.dropDatabase();
        jest.resetAllMocks();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    test('should like a comment with given id', async () => {
        const profileId = 'fc2008d2-40cb-4307-9a0c-fcd9a8228873';

        const comment = await CommentModel.create({
            title: 'New Comment',
            authorId: profileId,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            zodiac: '123'
        });

        const data = {
            profileId,
            reaction: 'like'
        };

        const response = await supertest(app).put(`/comments/${comment.id}/react`).send(data);

        expect(response.status).toEqual(200);
        expect(response.body.comment.reactions).toHaveLength(1);
    });

    test('should dislike a comment with given id', async () => {
        const profileId = 'fc2008d2-40cb-4307-9a0c-fcd9a8228873';
        const comment = await CommentModel.create({
            title: 'New Comment',
            authorId: profileId,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            zodiac: '123',
            reactions: [profileId]
        });

        const data = {
            profileId,
            reaction: 'unlike'
        };

        const response = await supertest(app).put(`/comments/${comment.id}/react`).send(data);

        expect(response.status).toEqual(200);
        expect(response.body.comment.reactions).toHaveLength(0);
    });
});
