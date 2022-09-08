import { useLocalization } from 'gatsby-theme-i18n';

import { locales } from '../../locales';
import { useNavigateToDifferentLocale } from './useNavigateToDifferentLocale';

export const useLocaleAsDropdown = () => {
  const { locale: currentLocale } = useLocalization();

  const { navigate } = useNavigateToDifferentLocale();

  return locales.map(locale => ({
    title: locale.localName,
    label: locale.name,
    onClick: () => navigate(locale.code),
    active: currentLocale === locale.code,
  }));
};
