// eslint-disable-next-line no-undef
module.exports = {
	plugins: [],
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current',
				},
			},
		],
		[
			'@babel/preset-react',
			{
				runtime: 'automatic',
			},
		], // Adds support for JSX
		'@babel/preset-typescript', // Adds support for typescript
	],
};
