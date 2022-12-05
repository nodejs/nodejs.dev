import { defaultLanguage } from "../../locales";
import { NavigationDataWithLocale } from "../types";

export function useLocaleBasedNavigation(navigations:NavigationDataWithLocale, locale:string) {
  let navigationLocale = locale;
  const navigationData = {};

  Object.entries(navigations).forEach(([sectionTitle, localeSections]) => {
    if(!(locale in localeSections)) {
      navigationLocale = defaultLanguage;
    }
    navigationData[sectionTitle] = localeSections[navigationLocale];
  });
  return navigationData;
}