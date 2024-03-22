const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const supertest = require("supertest");
const app = require('../../src/app');
const ProfileModel = require('../../src/models/profile');
const cheerio = require('cheerio');

describe('Profile routes', () => {
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

    test('should render the profile data', async () => {
        const profile = await ProfileModel.create({
            name: "John",
            description: "desc",
            mbti: "INTP",
            enneagram: "ennea",
            variant: "var",
            tritype: 1,
            socionics: "soci",
            sloan: "sloan",
            psyche: "psy"
        });

        const response = await supertest(app)
            .get(`/${profile.id}`);
        expect(response.status).toEqual(200);

        const $ = cheerio.load(response.text);

        const nameElement = $('h2.name');
        expect(nameElement).toHaveLength(1);

        expect(nameElement.text()).toContain('John MBTI');
    });

    test('should not render the page for not found Id', async () => {
        const id = '53047a36-0fe4-424d-9a4b-b567f4b0ef81';

        const response = await supertest(app).get(`/${id}`);
        expect(response.status).toEqual(404);
    });

    test('should create a profile with given data in req.body', async () => {
        const data = {
            name: "John",
            description: "desc",
            mbti: "INTP",
            enneagram: "ennea",
            variant: "var",
            tritype: 1,
            socionics: "soci",
            sloan: "sloan",
            psyche: "psy"
        };

        const response = await supertest(app)
            .post('/profiles')
            .send(data);
        
        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('profile');
        expect(response.body.profile).toHaveProperty('id');
        expect(response.body.profile.name).toEqual('John');
    });

    test('should not create a profile with given data missing fields in req.body', async () => {
        const data = {
            name: "John",
            description: "desc",
            mbti: "INTP",
            enneagram: "ennea",
            variant: "var",
            tritype: 1,
            socionics: "soci"
        };

        const response = await supertest(app)
            .post('/profiles')
            .send(data);
        
        expect(response.status).toEqual(500);
        expect(response.body).toHaveProperty('success');
        expect(response.body.success).toBeFalsy();
        expect(response.body.errors).toHaveLength(2);
    });

    test('should return an empty list of profiles', async () => {
        const response = await supertest(app)
            .get('/profiles');
        
        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('profiles');
        expect(response.body.profiles).toHaveLength(0);
    });

    test('should return a list with 2 profiles', async () => {
        const profile1 = {
            "name": "John 1",
            "description": "desc",
            "mbti": "INTP",
            "enneagram": "ennea",
            "variant": "var",
            "tritype": 1,
            "socionics": "soci",
            "sloan": "sloan",
            "psyche": "psy"
        };

        const profile2 = {
            "name": "John 2",
            "description": "desc",
            "mbti": "INTP",
            "enneagram": "ennea",
            "variant": "var",
            "tritype": 1,
            "socionics": "soci",
            "sloan": "sloan",
            "psyche": "psy"
        };

        await ProfileModel.create(profile1);
        await ProfileModel.create(profile2);

        const response = await supertest(app)
            .get('/profiles');
        
        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('profiles');
        expect(response.body.profiles).toHaveLength(2);
    });

    test('should create a new comment for given profile id', async () => {
        const profile = await ProfileModel.create({
            name: "John",
            description: "desc",
            mbti: "INTP",
            enneagram: "ennea",
            variant: "var",
            tritype: 1,
            socionics: "soci",
            sloan: "sloan",
            psyche: "psy"
        });

        const data = {
            "title": "New Comment",
            "comment": "The comment details",
            "mbti": "INTJ",
            "enneagram": "123",
            "zodiac": "123"
        };

        const response = await supertest(app)
            .post(`/profiles/${profile.id}/comments`)
            .send(data);

        expect(response.status).toEqual(201);
    });

    test('should not create a comment with given data missing fields in req.body', async () => {
        const profile = await ProfileModel.create({
            name: "John",
            description: "desc",
            mbti: "INTP",
            enneagram: "ennea",
            variant: "var",
            tritype: 1,
            socionics: "soci",
            sloan: "sloan",
            psyche: "psy"
        });

        const data = {
            "title": "New Comment",
            "comment": "The comment details",
            "mbti": "INTJ",
            "enneagram": "123"
        };

        const response = await supertest(app)
            .post(`/profiles/${profile.id}/comments`)
            .send(data);
        
        expect(response.status).toEqual(500);
        expect(response.body).toHaveProperty('success');
        expect(response.body.success).toBeFalsy();
        expect(response.body.errors).toHaveLength(1);
    });
});
