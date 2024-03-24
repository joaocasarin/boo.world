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

        profile.populate = jest.fn().mockResolvedValue(profile);

        const comments = await getPopulatedProfileService({ profile, sortBy });

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

        profile.populate = jest.fn().mockImplementation(() => {
            const expandedProfile = JSON.parse(JSON.stringify(profile));

            expandedProfile.comments = expandedProfile.comments.sort(
                (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
            );

            return expandedProfile;
        });

        const comments = await getPopulatedProfileService({ profile, sortBy });

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

        profile.populate = jest.fn().mockResolvedValue(profile);

        const comments = await getPopulatedProfileService({ profile, sortBy });

        expect(comments).toEqual([commentData2, commentData1]);
    });
});
