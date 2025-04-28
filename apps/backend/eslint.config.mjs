// @ts-check
import eslintConfigPrettier from "eslint-config-prettier";

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

let config = tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
)

export default [
    ...config,
    eslintConfigPrettier,
];

