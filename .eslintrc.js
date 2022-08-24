module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['airbnb-base'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    rules: {
        // code: 120,
        'max-len': ['warn', { code: 120, tabWidth: 4 }],
        indent: [0, 'tab'],
        'no-tabs': 0,
        'no-continue': 'off',
        'no-plusplus': 'off',
        'comma-dangle': 'off',
        'arrow-body-style': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'warn',
        'no-restricted-syntax': 'off',
        'object-curly-newline': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ]
    },
    settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx']
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    }
};
