import { useEffect } from 'react';
import { useLocalization } from 'gatsby-theme-i18n';
import { useNavigateToDifferentLocale } from './useNavigateToDifferentLocale';
import { detectLanguage } from '../util/detectLanguage';

const languageStorageKey = 'NODE_DEV_LAST_LANGUAGE';

const lastLanguageStorage = {
  getItem: () => window.localStorage.getItem(languageStorageKey),
  setItem: (currentLocale: string) =>
    window.localStorage.setItem(languageStorageKey, currentLocale),
};

export const useBrowserLanguageDetection = () => {
  const { locale: currentLocale } = useLocalization();
  const { navigate } = useNavigateToDifferentLocale();

  useEffect(() => {
    if (lastLanguageStorage.getItem() === null) {
      // Attempts to retrieve a Language that we suport that is accepted by the user
      // We use navigator.languages to identify the language preference of an user
      const matchingBrowserLanguage = detectLanguage();

      if (matchingBrowserLanguage) {
        lastLanguageStorage.setItem(matchingBrowserLanguage);

        navigate(matchingBrowserLanguage);
      }
    } else if (lastLanguageStorage.getItem() !== currentLocale) {
      lastLanguageStorage.setItem(currentLocale);
    }
  }, [currentLocale]);
};
