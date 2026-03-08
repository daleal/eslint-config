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

## TypeScript preset

```js
// eslint.config.mjs
import { eslint } from "@daleal/eslint-config-ts";

export default eslint({
  overrides: [
    {
      rules: {
        "no-console": "off",
      },
    },
  ],
});
```

## Vue preset (Vite)

```js
// eslint.config.mjs
import { eslint } from "@daleal/eslint-config-vue";

export default eslint({
  shorthands: ["~", "#"],
});
```

## Vue preset (Nuxt)

```js
// eslint.config.mjs
import withNuxt from "./.nuxt/eslint.config.mjs";
import { eslint } from "@daleal/eslint-config-vue";

export default withNuxt(
  ...eslint(),
);
```

If you need project-specific guards (e.g. restricted imports) or custom ignores,
pass them with `overrides`.

```js
import { eslint } from "@daleal/eslint-config-ts";

export default eslint({
  overrides: [
    {
      ignores: ["vendor/**"],
    },
  ],
});
```

## API

### `@daleal/eslint-config-ts`

Exports `eslint(options?)`.

Options:

- `overrides?: Linter.Config | Linter.Config[]`

### `@daleal/eslint-config-vue`

Exports `eslint(options?)`.

Options:

- `overrides?: Linter.Config | Linter.Config[]`
- `shorthands?: string[]` (default `['~']`)
