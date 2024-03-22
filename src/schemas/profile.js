'use strict';

const { z } = require('zod');
const { randomUUID } = require('crypto');

const ProfileSchema = z.object({
    id: z.string().default(randomUUID),
    name: z.string({ required_error: 'Name is required.', invalid_type_error: 'Invalid name.' }),
    description: z.string({ required_error: 'Description is required.', invalid_type_error: 'Invalid description.' }),
    mbti: z.string({ required_error: 'MBTI is required.', invalid_type_error: 'Invalid MBTI.' }),//.regex(/^[IE][SN][FT][PJ]$/, { message: "Invalid MBTI." }),
    enneagram: z.string({ required_error: 'Enneagram is required.', invalid_type_error: 'Invalid enneagram.' }),//.regex(/^([1-9]w[1-9])$/, { message: "Invalid enneagram." }),
    variant: z.string({ required_error: 'Variant is required.', invalid_type_error: 'Invalid variant.' }),//.regex(/^(SP|SO|SX)(\/(SP|SO|SX))*$/, { message: "Invalid variant." }),
    tritype: z.number({ required_error: 'Tritype is required.', invalid_type_error: 'Invalid tritype.' }),//.regex(/^\d{1,2}[w]?\d{1,2}[w]?\d{1,2}$/, { message: "Invalid tritype." }),
    socionics: z.string({ required_error: 'Socionics is required.', invalid_type_error: 'Invalid socionics.' }),
    sloan: z.string({ required_error: 'Sloan is required.', invalid_type_error: 'Invalid sloan.' }),
    psyche: z.string({ required_error: 'Psyche is required.', invalid_type_error: 'Invalid psyche.' }),
    image: z.string().url({ message: "Invalid URL." }).default("https://soulverse.boo.world/images/1.png")
});

module.exports = ProfileSchema;