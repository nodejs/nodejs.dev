const rawLocales = require('../src/i18n/config.json');

const locales = rawLocales.filter(locale => locale.enabled);

module.exports = {
  locales,
  localesAsString: locales.map(locale => locale.code).join(' '),
  defaultLanguage: 'en',
};
