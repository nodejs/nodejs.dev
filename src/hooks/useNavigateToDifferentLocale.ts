import { navigate as gatsbyNavigate } from 'gatsby';
import { useLocation } from '@gatsbyjs/reach-router';
import { useLocalization } from 'gatsby-theme-i18n';

export const useNavigateToDifferentLocale = () => {
  const { locale: currentLocale } = useLocalization();
  const { pathname, hash, search } = useLocation();

  const [, languagePath, ...remainingPath] = pathname.split('/');

  const getLocalePath = (newLocale: string) => {
    return (
      languagePath === currentLocale
        ? [newLocale, ...remainingPath]
        : [newLocale, languagePath, ...remainingPath]
    ).join('/');
  };

  return {
    navigate: (newLocale: string, replace = false) => {
      if (newLocale && newLocale !== currentLocale) {
        const newUrl = `/${getLocalePath(newLocale)}${search}${hash}`;

        gatsbyNavigate(newUrl, { replace });
      }
    },
  };
};
