import { useEffect, useState } from 'react';
import { useTheme as useThemeCSR } from '@skagami/gatsby-plugin-dark-mode';
import { useUpdateDocumentColorScheme } from './useUpdateDocumentColorScheme';

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<string | null>(null);

  const [themeCSR, setThemeCSR] = useThemeCSR();
  const updateColorScheme = useUpdateDocumentColorScheme(themeCSR);

  // Ensures that the theme value is the same on SSR and CSR
  useEffect(() => setCurrentTheme(themeCSR), [themeCSR]);

  const toggleTheme = (isKeyPress = false) => {
    if (isKeyPress) {
      return;
    }

    const newTheme = themeCSR === 'light' ? 'dark' : 'light';

    setThemeCSR(newTheme);
    updateColorScheme(newTheme);
  };

  return [currentTheme, toggleTheme] as const;
};
