const { z } = require('zod');
const { randomUUID } = require('crypto');

const ProfileSchema = z.object({
    id: z.string().default(randomUUID),
    name: z.string({ required_error: 'Name is required.', invalid_type_error: 'Invalid name.' }),
    description: z
        .string({
            invalid_type_error: 'Invalid description.'
        })
        .optional(),
    mbti: z.string({ invalid_type_error: 'Invalid MBTI.' }).optional(),
    enneagram: z
        .string({
            invalid_type_error: 'Invalid enneagram.'
        })
        .optional(),
    variant: z
        .string({
            invalid_type_error: 'Invalid variant.'
        })
        .optional(),
    tritype: z
        .number({
            invalid_type_error: 'Invalid tritype.'
        })
        .optional(),
    socionics: z
        .string({
            invalid_type_error: 'Invalid socionics.'
        })
        .optional(),
    sloan: z.string({ invalid_type_error: 'Invalid sloan.' }).optional(),
    psyche: z
        .string({
            invalid_type_error: 'Invalid psyche.'
        })
        .optional(),
    image: z
        .string()
        .url({ message: 'Invalid URL.' })
        .default('https://soulverse.boo.world/images/1.png')
        .optional()
});

module.exports = ProfileSchema;
