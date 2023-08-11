module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: 'standard',
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        indent: ['error', 4],
        semi: [2, 'always'],
        'new-cap': 0,
        'no-unused-vars': 'off',
        'padded-blocks': 0
    }
};
