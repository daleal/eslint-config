# @daleal/eslint-config

Shared ESLint flat configs for:

- TypeScript projects
- Vue projects (Vite + Nuxt)

## Install

```bash
bun add -D @daleal/eslint-config-ts eslint typescript
```

```bash
bun add -D @daleal/eslint-config-vue eslint typescript
```

## TypeScript

```ts
// eslint.config.mjs
import { eslint } from '@daleal/eslint-config-ts';

export default eslint();
```

You can also pass other flat configs using the `overrides` option:

```ts
// eslint.config.mjs
import { eslint } from '@daleal/eslint-config-ts';

export default eslint({
  overrides: [
    {
      rules: {
        'no-console': 'off',
      },
    },
  ],
});
```

## Vue

```ts
// eslint.config.mjs
import { eslint } from '@daleal/eslint-config-vue';

export default eslint({
  shorthands: ['~', '#'],
});
```

### With Nuxt

```ts
// eslint.config.mjs
import { eslint } from '@daleal/eslint-config-vue';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  ...eslint(),
);
```

If you need project-specific guards (e.g. restricted imports) or custom ignores,
pass them with `overrides`.

```ts
import { eslint } from '@daleal/eslint-config-ts';

export default eslint({
  overrides: [
    {
      ignores: ['vendor/**'],
    },
  ],
});
```
