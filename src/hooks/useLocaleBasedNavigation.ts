import { defaultLanguage } from '../../locales';
import { NavigationDataWithLocale } from '../types';

export function useLocaleBasedNavigation(
  navigationWithLocale: NavigationDataWithLocale,
  locale: string
) {
  let navigationLocale = locale;
  const navigationData = {};

  Object.entries(navigationWithLocale).forEach(
    ([sectionTitle, localeSections]) => {
      if (!(locale in localeSections)) {
        navigationLocale = defaultLanguage;
      }
      navigationData[sectionTitle] = localeSections[navigationLocale];
    }
  );
  return navigationData;
}
