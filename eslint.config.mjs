import antfu from '@antfu/eslint-config'
import format from 'eslint-plugin-format'

export default antfu({
  files: ['**/*.ts'],
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
}, {
  files: ['**/*.scss'],
  languageOptions: {
    parser: format.parserPlain,
  },
  plugins: {
    format,
  },
  rules: {
    'format/prettier': ['error', { parser: 'scss', tabWidth: 2 }],
    'no-console': 'off',
  },
})
