import { useLocalization } from 'gatsby-theme-i18n';

export const useLocalizedPath = () => {
  const { locale, defaultLang, localizedPath } = useLocalization();

  return (path: string) =>
    localizedPath({ locale, defaultLang, prefixDefault: true, path });
};
