import type { ConfigOptions } from '@daleal/eslint-config-core';
import { createImportOrderOptions, toArray } from '@daleal/eslint-config-core';
import eslintjs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import type { Linter } from 'eslint';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

const DEFAULT_IGNORES = ['**/node_modules/**', '**/dist/**', '**/.output/**', '**/.nuxt/**', '**/coverage/**'];

const STYLISTIC_RULES: NonNullable<Linter.Config['rules']> = {
  '@stylistic/arrow-parens': ['error', 'always'],
  '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
  '@stylistic/multiline-ternary': ['error', 'always-multiline'],
  '@stylistic/quote-props': ['error', 'as-needed', { numbers: true }],
  '@stylistic/semi': ['error', 'always'],
};

const SHARED_RULES: NonNullable<Linter.Config['rules']> = {
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
  '@typescript-eslint/unified-signatures': ['off'],
  'func-style': ['error', 'expression', { allowArrowFunctions: true }],
  'id-length': ['error', { min: 2 }],
  'import/order': ['error', createImportOrderOptions()],
  'no-restricted-syntax': ['error', {
    selector: 'SwitchStatement',
    message: 'Switch statements are disallowed. Use objects or if-else chains instead.',
  }],
};

export const eslint = (options: ConfigOptions = {}): Linter.Config[] => {
  const { overrides = [] } = options;

  const configs: Linter.Config[] = [
    { ignores: DEFAULT_IGNORES },
    eslintjs.configs.recommended,
    ...toArray(tseslint.configs.recommended),
  ];

  configs.push(...toArray(stylistic.configs.recommended));

  configs.push({
    plugins: {
      '@stylistic': stylistic,
    },
    rules: STYLISTIC_RULES,
  });

  configs.push({
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
    },
    rules: SHARED_RULES,
  });

  configs.push(...toArray(overrides));

  return configs;
};
