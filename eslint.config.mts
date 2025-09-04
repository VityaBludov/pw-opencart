import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
    {
        files: ['**/*.ts'],

        plugins: {
            '@typescript-eslint': tseslint,
            prettier: prettierPlugin,
        },

        languageOptions: {
            parser: tsparser,
            sourceType: 'module',
        },

        rules: {
            ...tseslint.configs.recommended.rules,
            ...prettierConfig.rules,
            '@typescript-eslint/no-unused-vars': 'warn',
            'no-console': 'warn',
            'semi': ['warn', 'never'],
            'quotes': ['warn', 'double'],
            'prettier/prettier': 'warn',
        },

        ignores: ['**/.husky/'],
    },
]
