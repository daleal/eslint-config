# @daleal/eslint-config-ts

Opinionated ESLint flat config for TypeScript projects, tuned for the way daleal likes imports, style rules, and type-aware linting.

## Install

```bash
bun add -D @daleal/eslint-config-ts eslint typescript
```

## Usage

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
