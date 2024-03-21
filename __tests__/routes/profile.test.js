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
        expect(nameElement.length).toEqual(1);

        expect(nameElement.text()).toContain('John MBTI');
    });

    test('should not render the page for not found Id', async () => {
        const id = '53047a36-0fe4-424d-9a4b-b567f4b0ef81';

        const response = await supertest(app).get(`/${id}`);
        expect(response.status).toEqual(500);
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
        
        expect(response.status).toEqual(200);
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
        expect(response.body).not.toHaveProperty('profile');
    });
});
