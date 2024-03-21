const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const supertest = require("supertest");
const app = require('../../app');
const ProfileModel = require('../../models/profile');
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
        const user = await ProfileModel.create({
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

        const response = await supertest(app).get(`/${user.id}`);
        expect(response.status).toEqual(200);

        const $ = cheerio.load(response.text);

        const nameElement = $('h2.name');
        expect(nameElement.length).toEqual(1);

        expect(nameElement.text()).toContain('John MBTI');
    });
});
