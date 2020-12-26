module.exports = {
    'env': {
        'es6': true,
        'node': true,
        'jest': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
        'prettier/@typescript-eslint'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
      'project': './tsconfig.json',
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        'react-hooks',
        '@typescript-eslint',
        'prettier',
    ],
    'rules': {
        'indent': [
            'error',
            2,
            {'SwitchCase': 1}
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-empty-function': 'off',
        'block-spacing': ["error", "never"],
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/ban-types': 'warn',
        'react/display-name': 'off',
        'react/prop-types': 'off',
        'prettier/prettier': ["error", {bracketSpacing: false}],
        
    },
    'settings': {
      'react': {
        'version': 'detect'
      }
    }
};