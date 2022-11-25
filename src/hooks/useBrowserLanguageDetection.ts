import { useEffect } from 'react';
import { useLocalization } from 'gatsby-theme-i18n';
import { useStorage } from './useStorage';
import { useNavigateToDifferentLocale } from './useNavigateToDifferentLocale';
import { detectLanguage } from '../util/detectLanguage';

const languageStorageKey = 'node_currentLocale';

export const useBrowserLanguageDetection = () => {
  const { locale: currentLocale } = useLocalization();
  const { navigate } = useNavigateToDifferentLocale();
  const { getItem, setItem } = useStorage();

  useEffect(() => {
    if (getItem(languageStorageKey) === undefined) {
      // Attempts to retrieve a Language that we suport that is accepted by the user
      // We use navigator.languages to identify the language preference of an user
      const matchingBrowserLanguage = detectLanguage();

      if (matchingBrowserLanguage) {
        setItem(languageStorageKey, matchingBrowserLanguage);

        navigate(matchingBrowserLanguage);
        return;
      }
    }

    setItem(languageStorageKey, currentLocale);
  }, [currentLocale]);
};
