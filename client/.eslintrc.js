module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
  ],
  rules: {
    'no-use-before-define': 'off',
  },
  ignorePatterns: ['**/*.stories.{js,jsx}'],
  settings: {
    react: {       // default to "createReactClass"
      "version": "detect",
    }
  }
};
