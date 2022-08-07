import { navigate as gatsbyNavigate, withPrefix } from 'gatsby';
import { useLocation } from '@gatsbyjs/reach-router';
import { useLocalization } from 'gatsby-theme-i18n';

export const useNavigateToDifferentLocale = () => {
  const { locale: currentLocale } = useLocalization();
  const { pathname, hash, search } = useLocation();

  const prefixPart = withPrefix('');

  const [, languagePath, ...remainingPath] = pathname
    .replace(prefixPart, '/')
    .split('/');

  const getLocalePath = (newLocale: string) =>
    (languagePath === currentLocale
      ? [newLocale, ...remainingPath]
      : [newLocale, languagePath, ...remainingPath]
    ).join('/');

  return {
    navigate: (newLocale: string, replace = false) => {
      if (newLocale && newLocale !== currentLocale) {
        const localePath = getLocalePath(newLocale);

        const newUrl = `/${localePath}${search}${hash}`;

        gatsbyNavigate(newUrl, { replace });
      }
    },
  };
};
