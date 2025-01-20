// eslint-disable-next-line no-undef
module.exports = {
	moduleDirectories: ['node_modules', 'src'],
	rootDir: 'src',
	setupFilesAfterEnv: ['@testing-library/jest-dom'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(css|scss)$': 'jest-transform-stub', // Transform CSS/SCSS files
		'^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
	},
};
