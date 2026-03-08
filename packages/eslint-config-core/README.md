# @daleal/eslint-config-core

Shared internals for the published `@daleal/eslint-config-*` presets.

This package is mainly meant to support the TypeScript and Vue presets in this monorepo.

## What it exports

- `toArray()`
- `createImportOrderOptions()`
- shared config types

## Install

```bash
bun add -D @daleal/eslint-config-core
```

## Usage

```ts
import { createImportOrderOptions } from '@daleal/eslint-config-core';

const options = createImportOrderOptions([
  { pattern: '~/**', group: 'internal', position: 'before' },
]);
```

If you just want a ready-to-use preset, install `@daleal/eslint-config-ts` or `@daleal/eslint-config-vue` instead.
