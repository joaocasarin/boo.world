const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const supertest = require("supertest");
const app = require('../../src/app');
const ProfileModel = require('../../src/models/profile');
const CommentModel = require('../../src/models/comment');
const cheerio = require('cheerio');

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
        const comment = await CommentModel.create({
            "title": "New Comment",
            "comment": "The comment details",
            "mbti": "INTJ",
            "enneagram": "123",
            "zodiac": "123"
        });

        const response = await supertest(app)
            .put(`/comments/${comment.id}/like`);

        expect(response.status).toEqual(200);
        expect(response.body.comment.likes).toEqual(1);
    });

    test('should dislike a comment with given id', async () => {
        const comment = await CommentModel.create({
            "title": "New Comment",
            "comment": "The comment details",
            "mbti": "INTJ",
            "enneagram": "123",
            "zodiac": "123"
        });

        const response = await supertest(app)
            .put(`/comments/${comment.id}/dislike`);

        expect(response.status).toEqual(200);
        expect(response.body.comment.likes).toEqual(-1);
    });
});
