import { useEffect, useState } from 'react';

export const useUpdateDocumentColorScheme = (
  defaultTheme: string | null = null
) => {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  useEffect(() => {
    // This is responsible for setting the color-scheme of the scroll-bars
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.style['color-scheme'] = currentTheme;
    }
  }, [currentTheme]);

  return (theme: string | null) => setCurrentTheme(theme);
};
