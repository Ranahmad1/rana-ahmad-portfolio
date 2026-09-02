module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/test/**/*.test.js'],
  collectCoverageFrom: ['utils.js'],
  coveragePathIgnorePatterns: ['/node_modules/']
};
