import { changeLocale, useIntl } from 'gatsby-plugin-react-intl';

import locales from '../locales.json';

export const useLocaleAsDropdown = () => {
  const { locale: currentLocale } = useIntl();

  return Object.entries(locales).map(([locale, data]) => ({
    title: data.language,
    label: data.name,
    // note: any query string parth and hash (#) are removed
    // this might become a blocker in the future
    // @todo create a better helper to replace parts of the url
    onClick: () => changeLocale(locale),
    active: currentLocale === locale,
  }));
};
