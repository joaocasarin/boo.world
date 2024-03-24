const { z } = require('zod');
const { randomUUID } = require('crypto');

const CommentSchema = z.object({
    id: z.string().default(randomUUID),
    authorId: z.string({
        required_error: 'Author ID is required.',
        invalid_type_error: 'Invalid author ID.'
    }),
    title: z.string({ required_error: 'Title is required.', invalid_type_error: 'Invalid title.' }),
    comment: z.string({
        required_error: 'Comment is required.',
        invalid_type_error: 'Invalid comment.'
    }),
    mbti: z.string({ invalid_type_error: 'Invalid MBTI.' }).optional(),
    enneagram: z
        .string({
            invalid_type_error: 'Invalid enneagram.'
        })
        .optional(),
    zodiac: z
        .string({
            invalid_type_error: 'Invalid zodiac.'
        })
        .optional()
});

module.exports = CommentSchema;
