const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
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
