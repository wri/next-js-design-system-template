/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  printWidth: 80,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  semi: false,
  bracketSpacing: true,
  tabWidth: 2,
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
}
