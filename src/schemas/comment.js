'use strict';

const { z } = require('zod');
const { randomUUID } = require('crypto');

const CommentSchema = z.object({
    id: z.string().default(randomUUID),
    title: z.string({ required_error: 'Title is required.', invalid_type_error: 'Invalid title.' }),
    comment: z.string({ required_error: 'Comment is required.', invalid_type_error: 'Invalid comment.' }),
    mbti: z.string({ required_error: 'MBTI is required.', invalid_type_error: 'Invalid MBTI.' }),//.regex(/^[IE][SN][FT][PJ]$/, { message: "Invalid MBTI." }),
    enneagram: z.string({ required_error: 'Enneagram is required.', invalid_type_error: 'Invalid enneagram.' }),//.regex(/^([1-9]w[1-9])$/, { message: "Invalid enneagram." }),
    zodiac: z.string({ required_error: 'Zodiac is required.', invalid_type_error: 'Invalid zodiac.' }),
});

module.exports = CommentSchema;