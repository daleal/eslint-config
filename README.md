# @daleal/eslint packages

Shared ESLint flat configs for:

- TypeScript projects
- Vue projects (Vite + Nuxt)

## Install

```bash
bun add -D @daleal/eslint-typescript eslint @eslint/js typescript-eslint @stylistic/eslint-plugin eslint-plugin-import typescript
```

```bash
bun add -D @daleal/eslint-vue eslint @eslint/js typescript-eslint @stylistic/eslint-plugin typescript eslint-plugin-vue vue-eslint-parser eslint-plugin-import
```

## TypeScript preset

```js
// eslint.config.mjs
import { eslint } from "@daleal/eslint-typescript";

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
import { eslint } from "@daleal/eslint-vue";

export default eslint({
  shorthands: ["~", "#"],
});
```

## Vue preset (Nuxt)

```js
// eslint.config.mjs
import withNuxt from "./.nuxt/eslint.config.mjs";
import { eslint } from "@daleal/eslint-vue";

export default withNuxt(
  ...eslint(),
);
```

If you need project-specific guards (e.g. restricted imports) or custom ignores,
pass them with `overrides`.

```js
import { eslint } from "@daleal/eslint-typescript";

export default eslint({
  overrides: [
    {
      ignores: ["vendor/**"],
    },
  ],
});
```

## API

### `@daleal/eslint-typescript`

Exports `eslint(options?)`.

Options:

- `overrides?: Linter.Config | Linter.Config[]`

### `@daleal/eslint-vue`

Exports `eslint(options?)`.

Options:

- `overrides?: Linter.Config | Linter.Config[]`
- `shorthands?: string[]` (default `['~']`)
