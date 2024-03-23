const { z } = require('zod');
const { randomUUID } = require('crypto');

const CommentSchema = z.object({
    id: z.string().default(randomUUID),
    authorId: z
        .string({
            required_error: 'Author ID is required.',
            invalid_type_error: 'Invalid author ID.'
        })
        .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),
    title: z.string({ required_error: 'Title is required.', invalid_type_error: 'Invalid title.' }),
    comment: z.string({
        required_error: 'Comment is required.',
        invalid_type_error: 'Invalid comment.'
    }),
    mbti: z.string({ invalid_type_error: 'Invalid MBTI.' }).optional(), // .regex(/^[IE][SN][FT][PJ]$/, { message: "Invalid MBTI." }),
    enneagram: z
        .string({
            invalid_type_error: 'Invalid enneagram.'
        })
        .optional(), // .regex(/^([1-9]w[1-9])$/, { message: "Invalid enneagram." }),
    zodiac: z
        .string({
            invalid_type_error: 'Invalid zodiac.'
        })
        .optional()
});

module.exports = CommentSchema;
