const getPopulatedProfileService = require('../../src/services/getPopulatedProfileService');

describe('Get Populated Profile Service', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should get all comment IDs from given profile without sorting', async () => {
        const id = 'f87a7517-b727-420c-9e44-ec5613ef5b20';
        const commentId1 = 'a3e28ca7-1a72-4ea9-a545-2359ef9d996e';
        const commentId2 = 'a3e28ca7-1a72-4ea9-a545-2359ef9d996d';

        const commentData1 = {
            id: commentId1,
            title: 'Comment 1',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:50:32.434Z'
        };

        const commentData2 = {
            id: commentId2,
            title: 'Comment 1',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:51:00.000Z'
        };

        const profile = {
            id,
            name: 'John',
            description: 'desc',
            mbti: 'INTP',
            enneagram: 'ennea',
            variant: 'var',
            tritype: 1,
            socionics: 'soci',
            sloan: 'sloan',
            psyche: 'psy',
            comments: [commentData1, commentData2]
        };

        const sortBy = '';
        const filterBy = '';

        profile.populate = jest.fn().mockResolvedValue(profile);

        const comments = await getPopulatedProfileService({ profile, sortBy, filterBy });

        expect(comments).toEqual(profile.comments);
    });

    test('should get all comment IDs from given profile sorted by most recent', async () => {
        const id = 'f87a7517-b727-420c-9e44-ec5613ef5b20';
        const commentId1 = 'a3e28ca7-1a72-4ea9-a545-2359ef9d996e';
        const commentId2 = 'b3e28ca7-1a72-4ea9-a545-2359ef9d996d';

        const commentData1 = {
            id: commentId1,
            title: 'Comment 1',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:50:32.434Z'
        };

        const commentData2 = {
            id: commentId2,
            title: 'Comment 2',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:51:00.000Z'
        };

        const profile = {
            id,
            name: 'John',
            description: 'desc',
            mbti: 'INTP',
            enneagram: 'ennea',
            variant: 'var',
            tritype: 1,
            socionics: 'soci',
            sloan: 'sloan',
            psyche: 'psy',
            comments: [commentData1, commentData2]
        };

        const sortBy = 'recent';
        const filterBy = '';

        profile.populate = jest.fn().mockImplementation(() => {
            const expandedProfile = JSON.parse(JSON.stringify(profile));

            expandedProfile.comments = expandedProfile.comments.sort(
                (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
            );

            return expandedProfile;
        });

        const comments = await getPopulatedProfileService({ profile, sortBy, filterBy });

        expect(comments).toEqual([commentData2, commentData1]);
    });

    test('should get all comment IDs from given profile sorted by most likes', async () => {
        const id = 'f87a7517-b727-420c-9e44-ec5613ef5b20';
        const id2 = 'a87a7517-b727-420c-9e44-ec5613ef5b21';
        const commentId1 = 'a3e28ca7-1a72-4ea9-a545-2359ef9d996e';
        const commentId2 = 'b3e28ca7-1a72-4ea9-a545-2359ef9d996d';

        const commentData1 = {
            id: commentId1,
            title: 'Comment 1',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            reactions: [id],
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:50:32.434Z'
        };

        const commentData2 = {
            id: commentId2,
            title: 'Comment 2',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            reactions: [id, id2],
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:51:00.000Z'
        };

        const profile = {
            id,
            name: 'John',
            description: 'desc',
            mbti: 'INTP',
            enneagram: 'ennea',
            variant: 'var',
            tritype: 1,
            socionics: 'soci',
            sloan: 'sloan',
            psyche: 'psy',
            comments: [commentData1, commentData2]
        };

        const sortBy = 'best';
        const filterBy = '';

        profile.populate = jest.fn().mockResolvedValue(profile);

        const comments = await getPopulatedProfileService({ profile, sortBy, filterBy });

        expect(comments).toEqual([commentData2, commentData1]);
    });

    test('should get all comment IDs from given profile containing mbti', async () => {
        const id = 'f87a7517-b727-420c-9e44-ec5613ef5b20';
        const commentMbtiId = 'a3e28ca7-1a72-4ea9-a545-2359ef9d996e';
        const commentMbtiEnneagramId = 'b3e28ca7-1a72-4ea9-a545-2359ef9d996d';
        const commentMbtiZodiacId = 'c3e28ca7-1a72-4ea9-a545-2359ef9d996d';
        const commentEnneagramId = 'd3e28ca7-1a72-4ea9-a545-2359ef9d996d';
        const commentZodiacId = 'e3e28ca7-1a72-4ea9-a545-2359ef9d996d';

        const commentMbti = {
            id: commentMbtiId,
            title: 'Comment 1',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:50:32.434Z'
        };

        const commentMbtiEnneagram = {
            id: commentMbtiEnneagramId,
            title: 'Comment 2',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:51:00.000Z'
        };

        const commentMbtiZodiac = {
            id: commentMbtiZodiacId,
            title: 'Comment 2',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            zodiac: 'cancer',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:51:00.000Z'
        };

        const commentEnneagram = {
            id: commentEnneagramId,
            title: 'Comment 2',
            authorId: id,
            comment: 'The comment details',
            enneagram: '123',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:51:00.000Z'
        };

        const commentZodiac = {
            id: commentZodiacId,
            title: 'Comment 2',
            authorId: id,
            comment: 'The comment details',
            zodiac: 'cancer',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:51:00.000Z'
        };

        const profile = {
            id,
            name: 'John',
            comments: [
                commentMbti,
                commentMbtiEnneagram,
                commentMbtiZodiac,
                commentEnneagram,
                commentZodiac
            ]
        };

        const sortBy = '';
        const filterBy = 'mbti';

        profile.populate = jest.fn().mockResolvedValue(profile);

        const comments = await getPopulatedProfileService({ profile, sortBy, filterBy });

        expect(comments).toEqual([commentMbti, commentMbtiEnneagram, commentMbtiZodiac]);
    });

    test('should get all comment IDs from given profile containing enneagram', async () => {
        const id = 'f87a7517-b727-420c-9e44-ec5613ef5b20';
        const commentMbtiId = 'a3e28ca7-1a72-4ea9-a545-2359ef9d996e';
        const commentMbtiEnneagramId = 'b3e28ca7-1a72-4ea9-a545-2359ef9d996d';
        const commentMbtiZodiacId = 'c3e28ca7-1a72-4ea9-a545-2359ef9d996d';
        const commentEnneagramId = 'd3e28ca7-1a72-4ea9-a545-2359ef9d996d';
        const commentZodiacId = 'e3e28ca7-1a72-4ea9-a545-2359ef9d996d';

        const commentMbti = {
            id: commentMbtiId,
            title: 'Comment 1',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:50:32.434Z'
        };

        const commentMbtiEnneagram = {
            id: commentMbtiEnneagramId,
            title: 'Comment 2',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:51:00.000Z'
        };

        const commentMbtiZodiac = {
            id: commentMbtiZodiacId,
            title: 'Comment 2',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            zodiac: 'cancer',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:51:00.000Z'
        };

        const commentEnneagram = {
            id: commentEnneagramId,
            title: 'Comment 2',
            authorId: id,
            comment: 'The comment details',
            enneagram: '123',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:51:00.000Z'
        };

        const commentZodiac = {
            id: commentZodiacId,
            title: 'Comment 2',
            authorId: id,
            comment: 'The comment details',
            zodiac: 'cancer',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:51:00.000Z'
        };

        const profile = {
            id,
            name: 'John',
            comments: [
                commentMbti,
                commentMbtiEnneagram,
                commentMbtiZodiac,
                commentEnneagram,
                commentZodiac
            ]
        };

        const sortBy = '';
        const filterBy = 'enneagram';

        profile.populate = jest.fn().mockResolvedValue(profile);

        const comments = await getPopulatedProfileService({ profile, sortBy, filterBy });

        expect(comments).toEqual([commentMbtiEnneagram, commentEnneagram]);
    });

    test('should get all comment IDs from given profile containing zodiac', async () => {
        const id = 'f87a7517-b727-420c-9e44-ec5613ef5b20';
        const commentMbtiId = 'a3e28ca7-1a72-4ea9-a545-2359ef9d996e';
        const commentMbtiEnneagramId = 'b3e28ca7-1a72-4ea9-a545-2359ef9d996d';
        const commentMbtiZodiacId = 'c3e28ca7-1a72-4ea9-a545-2359ef9d996d';
        const commentEnneagramId = 'd3e28ca7-1a72-4ea9-a545-2359ef9d996d';
        const commentZodiacId = 'e3e28ca7-1a72-4ea9-a545-2359ef9d996d';

        const commentMbti = {
            id: commentMbtiId,
            title: 'Comment 1',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:50:32.434Z'
        };

        const commentMbtiEnneagram = {
            id: commentMbtiEnneagramId,
            title: 'Comment 2',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            enneagram: '123',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:51:00.000Z'
        };

        const commentMbtiZodiac = {
            id: commentMbtiZodiacId,
            title: 'Comment 2',
            authorId: id,
            comment: 'The comment details',
            mbti: 'INTJ',
            zodiac: 'cancer',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:51:00.000Z'
        };

        const commentEnneagram = {
            id: commentEnneagramId,
            title: 'Comment 2',
            authorId: id,
            comment: 'The comment details',
            enneagram: '123',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:51:00.000Z'
        };

        const commentZodiac = {
            id: commentZodiacId,
            title: 'Comment 2',
            authorId: id,
            comment: 'The comment details',
            zodiac: 'cancer',
            createdAt: '2024-03-24T03:49:59.395Z',
            updatedAt: '2024-03-24T03:51:00.000Z'
        };

        const profile = {
            id,
            name: 'John',
            comments: [
                commentMbti,
                commentMbtiEnneagram,
                commentMbtiZodiac,
                commentEnneagram,
                commentZodiac
            ]
        };

        const sortBy = '';
        const filterBy = 'zodiac';

        profile.populate = jest.fn().mockResolvedValue(profile);

        const comments = await getPopulatedProfileService({ profile, sortBy, filterBy });

        expect(comments).toEqual([commentMbtiZodiac, commentZodiac]);
    });
});
