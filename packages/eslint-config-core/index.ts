import type { Linter } from 'eslint';

export type ConfigOptions = {
  overrides?: Linter.Config | Linter.Config[]
};

export type ImportOrderPathGroup = {
  pattern: string
  group: 'builtin' | 'external' | 'internal' | 'parent' | 'sibling' | 'index' | 'object' | 'type'
  position?: 'before' | 'after'
};

export type ImportOrderOptions = {
  groups: ['builtin', 'external', 'internal', 'index', 'parent', 'object', 'sibling']
  pathGroups: ImportOrderPathGroup[]
  alphabetize: {
    order: 'asc'
    orderImportKind: 'asc'
  }
  warnOnUnassignedImports: true
};

export const toArray = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);

export const createImportOrderOptions = (pathGroups: ImportOrderPathGroup[] = []): ImportOrderOptions => ({
  groups: ['builtin', 'external', 'internal', 'index', 'parent', 'object', 'sibling'],
  pathGroups,
  alphabetize: { order: 'asc', orderImportKind: 'asc' },
  warnOnUnassignedImports: true,
});
