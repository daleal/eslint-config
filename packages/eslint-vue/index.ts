import type { ConfigOptions, ImportOrderPathGroup } from '@daleal/eslint-core';
import { createImportOrderOptions, toArray } from '@daleal/eslint-core';
import { eslint as eslintTypescript } from '@daleal/eslint-typescript';
import type { Linter } from 'eslint';
import importPlugin from 'eslint-plugin-import';
import vuePlugin from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

type VueConfigOptions = ConfigOptions & {
  shorthands?: Array<string>
};

const createVuePathGroups = (shorthands: Array<string>): ImportOrderPathGroup[] => {
  const shorthandBeforePathGroups: ImportOrderPathGroup[] = shorthands.map((shorthand) => ({
    pattern: `${shorthand}/**`,
    group: 'internal',
    position: 'before',
  }));

  const shorthandAfterPathGroups: ImportOrderPathGroup[] = shorthands.map((shorthand) => ({
    pattern: `${shorthand}/**/components/**`,
    group: 'internal',
    position: 'after',
  }));

  return [
    ...shorthandBeforePathGroups,
    { pattern: '**/*.svg?component', group: 'internal', position: 'after' },
    ...shorthandAfterPathGroups,
    { pattern: '**/*.vue', group: 'internal', position: 'after' },
    { pattern: '**/*.scss', group: 'internal', position: 'after' },
    { pattern: './**/*.vue', group: 'sibling', position: 'after' },
  ];
};

export const eslint = (options: VueConfigOptions = {}): Linter.Config[] => {
  const { overrides = [], shorthands = ['~'] } = options;

  return [
    ...eslintTypescript(),
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
      rules: {
        'import/order': ['error', createImportOrderOptions(createVuePathGroups(shorthands))],
      },
    },
    ...toArray(overrides),
  ];
};
