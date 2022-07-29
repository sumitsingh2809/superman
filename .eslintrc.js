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
        indent: [0, 'tab'],
        'no-tabs': 0,
        'comma-dangle': 'off',
        'arrow-body-style': 'off',
        'import/prefer-default-export': 'off',
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
