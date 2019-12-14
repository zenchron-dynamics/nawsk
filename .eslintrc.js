module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: false,
        node: false,
    },
    extends: [
        'airbnb-base',
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint',
        // uses eslint-config-prettier to disable ESlint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended',
        // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    // Specifies the EsLint parser
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        tsconfigRootDir: '.',
        project: './tsconfig.json',
        // Allows for the parsing of modern ECMAScript features
        sourceType: 'module',
        // Allows for the use of imports
        "ecmaFeatures": {
            "jsx": true
            // Allows for the parsing of JSX
        }
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            'node': {
                "paths": [
                    "src"
                ],
                'extensions': [
                    '.js',
                    '.jsx',
                    '.ts',
                    '.tsx'
                ]
            }
        },
        'react': {
            'version': "999.999.999"
        }
    },
    plugins: [
        '@typescript-eslint',
        'html',
        'prettier'
    ],
    rules: {
        'import/extensions': ['error', 'ignorePackages', {
            'js': 'never',
            'ts': 'never',
            'mjs': 'never',
            'jsx': 'never',
        }],
        'prettier/prettier': [
            'error',
        ]
    },
};
