'use strict';

const { validateIdParam, validateProfileDataOnBody } = require('../../src/middlewares/validate-requests');
const { ZodError } = require('zod');

describe('Validate requests tests', () => {
    test('should validate given ID and add it to req object', () => {
        const req = {
            params: {
                id: '53047a36-0fe4-424d-9a4b-b567f4b0ef81'
            }
        };

        validateIdParam(req, null, (_) => {});

        expect(req).toHaveProperty('profileId');
        expect(req.profileId).toEqual(req.params.id);
    });

    test('should invalidate given ID', () => {
        const req = {
            params: {
                id: '123'
            }
        };

        const result = validateIdParam(req, null, (text) => text);

        expect(req).not.toHaveProperty('profileId');
        expect(result).toEqual(`Provided Id [${req.params.id}] is not a UUIDv4.`);
    });

    test('should validate request body data and add it to req object', () => {
        const req = {
            body: {
                "name": "John",
                "description": "desc",
                "mbti": "INTP",
                "enneagram": "ennea",
                "variant": "var",
                "tritype": 1,
                "socionics": "soci",
                "sloan": "sloan",
                "psyche": "psy"
            }
        };

        validateProfileDataOnBody(req, null, () => {});

        expect(req).toHaveProperty('profileData');
        expect(req.profileData).toEqual(req.body);
    });

    test('should invalidate request body data missing some fields', () => {
        const req = {
            body: {
                "name": "John",
                "description": "desc",
                "mbti": "INTP",
                "enneagram": "ennea",
                "variant": "var",
                "tritype": 1
            }
        };

        const result = validateProfileDataOnBody(req, null, (error) => error);

        expect(req).not.toHaveProperty('profileData');
        expect(result instanceof ZodError).toBeTruthy();
    });
});