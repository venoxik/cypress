const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    baseUrl: "https://todomvc.com/examples/vue/?fbclid=IwAR023Rd-GFJn55HhQf3CPivCpJOWs2catatb709x_VxrhsS3Qt3lZ9zN5xw",
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000
  },
});
