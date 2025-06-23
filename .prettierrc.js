/**
 * @type {import('prettier').Config}
 */
module.exports = {
	endOfLine: 'lf',
	printWidth: 100,
	semi: true,
	singleQuote: true,
	trailingComma: 'all',
	useTabs: true,
	overrides: [
		{
			files: ['*.json', '*.md', '*.yml', '*.yaml'],
			options: {
				useTabs: false,
			},
		},
		{
			files: ['*.md'],
			options: {
				proseWrap: 'always',
			},
		},
		{
			files: ['package.json'],
			options: {
				printWidth: 130,
			},
		},
	],
}; 