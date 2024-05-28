module.exports = {
  root: true,
  extends: ['@gfe/eslint-config-gfe-core'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['src/styles/*.css.d.ts'],
};