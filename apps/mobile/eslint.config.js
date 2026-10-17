const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

const colourMessage = 'No raw colours in the app. Use a token from @cfa/tokens (handoff §3).';

module.exports = defineConfig([
  expoConfig,
  { ignores: ['dist/*', '.expo/*'] },
  {
    rules: {
      'no-restricted-syntax': [
        'error',
        { selector: 'Literal[value=/^#[0-9a-fA-F]{3,8}$/]', message: colourMessage },
        { selector: 'Literal[value=/rgba?\\(|hsla?\\(/]', message: colourMessage },
        {
          selector: 'TemplateElement[value.raw=/#[0-9a-fA-F]{3,8}\\b|rgba?\\(|hsla?\\(/]',
          message: colourMessage,
        },
      ],
    },
  },
]);
