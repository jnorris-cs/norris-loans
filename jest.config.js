// eslint-disable-next-line no-undef
module.exports = {
	setupFilesAfterEnv: ['@testing-library/jest-dom'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(css|scss)$': 'jest-transform-stub', // Transform CSS/SCSS files
		'^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
	},
	rootDir: 'src',
	moduleDirectories: ['node_modules', 'src'],
};
