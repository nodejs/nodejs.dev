module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-full-stop': [2, 'never', '.'],
    'subject-case': [2, 'always', ['sentence-case']],
  },
};
