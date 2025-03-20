import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import typescriptEslintParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],

    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module'
      }
    }
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: 'readonly'
      }
    }
  },

  pluginJs.configs.recommended,

  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  {
    rules: {
      'no-tabs': ['error'],
      indent: ['error', 2],
      'no-trailing-spaces': ['error'],
      'object-curly-spacing': ['error', 'always'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'space-before-function-paren': ['error', 'always'],
      'space-in-parens': ['error', 'never'],
      'brace-style': ['error', '1tbs'],
      'linebreak-style': ['error', 'unix'],
      camelcase: ['error'],
      'no-multi-spaces': ['error'],
      'comma-dangle': ['error', 'never'],
      'no-extra-semi': ['error'],
      'no-extra-parens': ['error', 'all'],
      'prefer-const': 'error',
      eqeqeq: ['error', 'always']
    }
  }
];
