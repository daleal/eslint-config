# @daleal/eslint-config-vue

Opinionated ESLint flat config for Vue + TypeScript projects, tuned for the way daleal likes imports, style rules, and type-aware linting.

## Install

```bash
bun add -D @daleal/eslint-config-vue eslint typescript
```

## Usage

```ts
// eslint.config.mjs
import { eslint } from '@daleal/eslint-config-vue';

export default eslint();
```

By default, the app expects `~` to be the only shorthand, but you can override it:

```ts
// eslint.config.mjs
import { eslint } from '@daleal/eslint-config-vue';

export default eslint({
  shorthands: ['~', '#'],
});
```

You can also pass other flat configs using the `overrides` option:

```ts
// eslint.config.mjs
import { eslint } from '@daleal/eslint-config-vue';

export default eslint({
  shorthands: ['@'],
  overrides: [
    {
      rules: {
        'no-console': 'off',
      },
    },
  ],
});
```

### With Nuxt

Set `eslint.config.standalone` to `false` in `nuxt.config.ts`, otherwise Nuxt will generate its own standalone config and this preset will not be merged in correctly.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  eslint: {
    config: {
      standalone: false,
    },
  },
});
```

```ts
// eslint.config.mjs
import { eslint } from '@daleal/eslint-config-vue';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  ...eslint(),
);
```

## Options

- `shorthands?: string[]` default `['~']`
- `overrides?: Linter.Config | Linter.Config[]`
