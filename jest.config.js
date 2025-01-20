// eslint-disable-next-line no-undef
module.exports = {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
		'^.+\\.(css|scss)$': 'jest-transform-stub', // Transform CSS/SCSS files
	},
	setupFilesAfterEnv: ['@testing-library/jest-dom'],
};
