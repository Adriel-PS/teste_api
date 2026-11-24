const { test: base, expect } = require('@playwright/test');
const UserService = require('../services/UserService');

// Custom fixture estendendo o test padrão do Playwright
const test = base.extend({
  userService: async ({ request }, use) => {
    const userService = new UserService(request);
    await use(userService);
  },
});

module.exports = { test, expect };
