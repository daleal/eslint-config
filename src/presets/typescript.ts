import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import type { Linter } from 'eslint';
import tseslint from 'typescript-eslint';

import type { TypeScriptConfigOptions } from '../types';

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
};

const toArray = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);

export const typescript = (options: TypeScriptConfigOptions = {}): Linter.Config[] => {
  const { ignores = DEFAULT_IGNORES, typeAware = false, stylistic: withStylistic = true } = options;

  const typeScriptRecommended = typeAware
    ? toArray(tseslint.configs.recommendedTypeChecked)
    : toArray(tseslint.configs.recommended);

  const configs: Linter.Config[] = [
    { ignores },
    eslint.configs.recommended,
    ...typeScriptRecommended,
  ];

  if (typeAware) {
    configs.push({
      files: ['**/*.{ts,tsx,cts,mts,vue}'],
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: process.cwd(),
        },
      },
    });
  }

  if (withStylistic) {
    configs.push(...toArray(stylistic.configs['recommended-flat']));
    configs.push({
      plugins: {
        '@stylistic': stylistic,
      },
      rules: STYLISTIC_RULES,
    });
  }

  configs.push({
    rules: SHARED_RULES,
  });

  return configs;
};
