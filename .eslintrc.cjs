module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,    
    jest: true,  
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
  },
  parser: "babel-eslint",
  rules: {
    'no-console': 'off',
    'no-param-reassign': 0,
    'import/extensions': 0,
    curly: ['error', 'all'],
    'consistent-return': 'off',
    'class-methods-use-this': ['off'],
    "no-underscore-dangle": ['off'],

  },
};
