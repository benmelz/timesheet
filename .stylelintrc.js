module.exports = {
  extends: 'stylelint-config-standard',
  overrides: [
    {
      files: ['**/*.scss'],
      extends: 'stylelint-config-standard-scss'
    }
  ]
};
