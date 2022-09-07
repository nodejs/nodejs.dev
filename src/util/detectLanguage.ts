import { localesAsString } from '../../locales';

const localeKeysAsArray = localesAsString.split(' ');

export const detectLanguage = () => {
  // Some of these languages have locale codes, eg.: en-US, en-DE so we want to break those down
  const browserAvailableLocales = window.navigator.languages
    ? window.navigator.languages
    : [window.navigator.language];

  const browserAvailableLanguages = browserAvailableLocales
    .map(locale => locale.toLowerCase().split('-'))
    .flat();

  const firstMatchingLanguage = browserAvailableLanguages.find(language =>
    localeKeysAsArray.includes(language)
  );

  if (firstMatchingLanguage) {
    return firstMatchingLanguage;
  }

  return null;
};
