import type { ConfigOptions, ImportOrderPathGroup } from '@daleal/eslint-config-core';
import { createImportOrderOptions, toArray } from '@daleal/eslint-config-core';
import { eslint as eslintTypescript } from '@daleal/eslint-config-ts';
import type { Linter } from 'eslint';
import importPlugin from 'eslint-plugin-import';
import vuePlugin from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

type VueConfigOptions = ConfigOptions & {
  shorthands?: Array<string>
};

const VUE_RULES: NonNullable<Linter.Config['rules']> = {
  'vue/multi-word-component-names': ['off'],
  'vue/require-default-prop': ['off'],
  'vue/define-props-destructuring': ['error', { destructure: 'never' }],
  'no-restricted-syntax': ['error', {
    selector: 'ExpressionStatement > CallExpression[callee.name=\'defineProps\']',
    message: 'Assign defineProps() to `const props = ...` and access props via `props.foo`.',
  }],
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
      files: ['**/*.{js,mjs,jsx,ts,mts,tsx,vue}'],
      languageOptions: {
        globals: globals.browser,
      },
    },
    {
      files: ['**/*.vue'],
      rules: VUE_RULES,
      languageOptions: {
        parser: vueParser,
        parserOptions: {
          parser: tseslint.parser,
          sourceType: 'module',
          ecmaVersion: 'latest',
          extraFileExtensions: ['.vue'],
        },
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
