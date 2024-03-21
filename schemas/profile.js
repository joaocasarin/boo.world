'use strict';

const { z } = require('zod');
const { randomUUID } = require('crypto');

const ProfileSchema = z.object({
    id: z.string().default(randomUUID),
    name: z.string(),
    description: z.string(),
    mbti: z.string(),//.regex(/^[IE][SN][FT][PJ]$/, { message: "Invalid MBTI." }),
    enneagram: z.string(),//.regex(/^([1-9]w[1-9])$/, { message: "Invalid enneagram." }),
    variant: z.string(),//.regex(/^(SP|SO|SX)(\/(SP|SO|SX))*$/, { message: "Invalid variant." }),
    tritype: z.number(),//.regex(/^\d{1,2}[w]?\d{1,2}[w]?\d{1,2}$/, { message: "Invalid tritype." }),
    socionics: z.string(),
    sloan: z.string(),
    psyche: z.string(),
    image: z.string().url({ message: "Invalid URL." }).default("https://soulverse.boo.world/images/1.png")
});

module.exports = ProfileSchema;