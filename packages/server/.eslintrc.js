module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: { ecmaVersion: 2018, sourceType: 'module' },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 2,
    'eol-last': 2,
    'require-await': 2,
  },
};
