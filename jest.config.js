/** @type {import('jest').Config} */
const config = {
    verbose: true,
    testPathIgnorePatterns: [
        '/node_modules/',
        '.prettierrc.js',
        '.eslintrc.js',
        'package-lock.json'
    ]
};

module.exports = config;
