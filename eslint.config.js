/* eslint sort-keys: "error" -- Organise rules */

import { globals, makeEslintConfig } from '@averay/codeformat';

export default [
  {
    ignores: ['coverage/**/*', 'packages/*/dist/**/*'],
  },
  ...makeEslintConfig({ tsconfigPath: './tsconfig.json' }),
  {
    files: ['lib/**/*'],
    languageOptions: {
      globals: { ...globals.node, BufferEncoding: 'readonly', NodeJS: 'readonly' },
    },
  },
  {
    files: ['test/**/*'],
    languageOptions: {
      globals: { ...globals.node, ...globals.jest, NodeJS: 'readonly' },
    },
    rules: {
      'unicorn/prefer-module': 'off',
    },
  },
  {
    files: ['packages/*/src/index.ts'],
    languageOptions: {
      globals: { ...globals.node, NodeJS: 'readonly' },
    },
  },
];
