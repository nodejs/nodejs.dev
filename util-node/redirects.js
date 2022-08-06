const { defaultLanguage } = require('./locales');

// This file is used to define all the changed slugs from original nodejs.org site to our new site.
// And other redirections
module.exports = {
  // Redirects Node.js Get Involved to Community
  '/en/get-involved': '/community',
  // Redirects no localized pages to the default language
  '/': `/${defaultLanguage}`,
};
