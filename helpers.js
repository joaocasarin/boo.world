'use strict';

const isUUIDv4 = (text) => {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    return regex.test(text);
}

module.exports = {
    isUUIDv4
};