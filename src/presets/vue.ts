import type { Linter } from 'eslint';
import importPlugin from 'eslint-plugin-import';
import vuePlugin from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

import type { VueConfigOptions } from '../types';
import { typescript } from './typescript';

const IMPORT_ORDER_RULE: NonNullable<Linter.Config['rules']> = {
  'import/order': ['error', {
    groups: ['builtin', 'external', 'internal', 'index', 'parent', 'object', 'sibling'],
    pathGroups: [
      { pattern: '~/**', group: 'internal', position: 'before' },
      { pattern: '#/**', group: 'internal', position: 'before' },
      { pattern: '**/*.svg?component', group: 'internal', position: 'after' },
      { pattern: '~/**/components/**', group: 'internal', position: 'after' },
      { pattern: '**/*.vue', group: 'internal', position: 'after' },
      { pattern: '**/*.scss', group: 'internal', position: 'after' },
      { pattern: './**/*.vue', group: 'sibling', position: 'after' },
    ],
    alphabetize: { order: 'asc', orderImportKind: 'asc' },
    warnOnUnassignedImports: true,
  }],
};

const toArray = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);

export const vue = (options: VueConfigOptions = {}): Linter.Config[] => {
  const { nuxt = false, typeAware = false, stylistic = true, ignores } = options;

  const includeStylisticPlugin = stylistic && !nuxt;

  const configs: Linter.Config[] = [
    ...typescript({ typeAware, ignores, stylistic: includeStylisticPlugin }),
    ...toArray(vuePlugin.configs['flat/recommended']),
    {
      files: ['**/*.vue'],
      languageOptions: {
        parser: vueParser,
        parserOptions: {
          parser: tseslint.parser,
          sourceType: 'module',
          ecmaVersion: 'latest',
          extraFileExtensions: ['.vue'],
        },
      },
      rules: {
        'vue/multi-word-component-names': ['off'],
      },
    },
    {
      plugins: {
        import: importPlugin,
      },
      rules: IMPORT_ORDER_RULE,
    },
  ];

  return configs;
};
