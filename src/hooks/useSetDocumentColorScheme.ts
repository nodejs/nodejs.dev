import { useEffect } from 'react';

export function useSetDocumentColorScheme(theme: string | null): void {
  useEffect(() => {
    // This is responsible for setting the color-scheme of the scroll-bars
    if (typeof document === 'object' && document.documentElement) {
      document.documentElement.style['color-scheme'] = theme;
    }
  }, [theme]);
}
