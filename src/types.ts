export type SharedConfigOptions = {
  ignores?: string[]
  typeAware?: boolean
  stylistic?: boolean
};

export type TypeScriptConfigOptions = SharedConfigOptions;

export type VueConfigOptions = SharedConfigOptions & {
  nuxt?: boolean
};
