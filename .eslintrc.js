module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: { ecmaVersion: 2018, sourceType: 'module' },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'eol-last': 2,
  },
};
