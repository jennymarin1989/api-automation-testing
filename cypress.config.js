// eslint-disable-next-line no-undef
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://jsonplaceholder.typicode.com/',
    numTestsKeptInMemory: 3,
    failOnStatusCode: false,
    chromeWebSecurity: false
  },
  env: {
    snapshotOnly: true,
    requestMode: true
  }
});
