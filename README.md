# @daleal/eslint

Shared ESLint flat configs for:

- TypeScript projects
- Vue projects (Vite + Nuxt)

## Install

```bash
bun add -D @daleal/eslint eslint @eslint/js typescript-eslint @stylistic/eslint-plugin eslint-plugin-vue vue-eslint-parser eslint-plugin-import
```

## TypeScript preset

```js
// eslint.config.mjs
import { typescript } from "@daleal/eslint";

export default typescript();
```

## Vue preset (Vite)

```js
// eslint.config.mjs
import { vue } from "@daleal/eslint";

export default vue();
```

## Vue preset (Nuxt)

```js
// eslint.config.mjs
import withNuxt from "./.nuxt/eslint.config.mjs";
import { vue } from "@daleal/eslint";

export default withNuxt(
  ...vue({ nuxt: true }),
);
```

If you need project-specific guards (e.g. restricted imports) or custom ignores,
keep them in the local project config and append/spread this preset.

## API

### `typescript(options?)`

Options:

- `typeAware?: boolean` (default `false`)
- `ignores?: string[]`
- `stylistic?: boolean` (default `true`)

### `vue(options?)`

Options:

- `nuxt?: boolean` (default `false`)
- `typeAware?: boolean` (default `false`)
- `ignores?: string[]`
- `stylistic?: boolean` (default `true`)

When `nuxt: true`, stylistic plugin registration is skipped to avoid duplicate
setup with Nuxt defaults.
