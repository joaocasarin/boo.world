module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    extends: ['airbnb-base', 'plugin:json/recommended', 'prettier'],
    overrides: [
        {
            env: {
                node: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    ignorePatterns: ['node_modules/', 'package-lock.json'],
    plugins: ['prettier'],
    rules: {
        'import/extensions': ['error', 'never'],
        'import/prefer-default-export': 'off',
        'import/first': 'off',
        'linebreak-style': ['error', 'unix'],
        indent: ['error', 4],
        'comma-dangle': ['error', 'never'],
        'class-methods-use-this': 'off',
        semi: ['error', 'always']
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    }
};
