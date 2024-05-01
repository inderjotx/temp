require("jest-fetch-mock").enableMocks();

module.exports = {
  // Configure Jest to only recognize .test.js files for testing
  testMatch: [
    "**/*.test.js"  // This pattern matches any .test.js files
  ],
}