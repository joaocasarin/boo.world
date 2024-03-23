'use strict';

const CustomError = require('../../src/helpers/CustomError');
const { validateIdParam, validateProfileDataOnBody, validateCommentDataOnBody } = require('../../src/middlewares/validate-requests');
const { ZodError } = require('zod');

describe('Validate requests tests', () => {
    test('should validate given ID and add it to req object', () => {
        const req = {
            params: {
                id: '53047a36-0fe4-424d-9a4b-b567f4b0ef81'
            }
        };

        validateIdParam(req, null, (_) => {});

        expect(req).toHaveProperty('id');
        expect(req.id).toEqual(req.params.id);
    });

    test('should invalidate given ID', () => {
        const req = {
            params: {
                id: '123'
            }
        };

        const result = validateIdParam(req, null, (text) => text);

        expect(req).not.toHaveProperty('profileId');
        expect(result instanceof CustomError).toBeTruthy();
        expect(result.message).toEqual(`Provided Id [${req.params.id}] is not a UUIDv4.`);
        expect(result.status).toEqual(400);
    });

    test('should validate request body profile data and add it to req object', () => {
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

    test('should invalidate request body profile data missing some fields', () => {
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

    test('should validate request body comment data and add it to req object', () => {
        const req = {
            body: {
                "title": "New Comment",
                "authorId": "fc2008d2-40cb-4307-9a0c-fcd9a8228873",
                "comment": "The comment details",
                "mbti": "INTJ",
                "enneagram": "123",
                "zodiac": "123"
            }
        };

        validateCommentDataOnBody(req, null, () => {});

        expect(req).toHaveProperty('commentData');
        expect(req.commentData).toEqual(req.body);
    });

    test('should invalidate request body comment data missing some fields', () => {
        const req = {
            body: {
                "title": "New Comment",
                "comment": "The comment details",
                "mbti": "INTJ",
                "enneagram": "123"
            }
        };

        const result = validateCommentDataOnBody(req, null, (error) => error);

        expect(req).not.toHaveProperty('commentData');
        expect(result instanceof ZodError).toBeTruthy();
    });
});