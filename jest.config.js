/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [ "src/**" ],
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  verbose: true,
};
