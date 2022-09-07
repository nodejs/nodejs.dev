const rawLocales = require('./src/i18n/config.json');
const defaultMessages = require('./src/i18n/locales/en.json');

const locales = rawLocales.filter(locale => locale.enabled);

module.exports = {
  locales,
  localesAsString: locales.map(locale => locale.code).join(' '),
  defaultMessages,
  defaultLanguage: 'en',
};
