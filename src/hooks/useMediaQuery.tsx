import { useState, useLayoutEffect } from 'react';

// eslint-disable-next-line import/prefer-default-export
export function useMediaQuery(query: string): boolean | undefined {
  const [matches, setMatches] = useState<boolean>();

  useLayoutEffect(() => {
    if (typeof window.matchMedia === 'function') {
      const mq = window.matchMedia(query);
      setMatches(mq.matches);
      const handler = (): void => setMatches(mq.matches);
      mq.addEventListener('change', handler);
      return (): void => mq.removeEventListener('change', handler);
    }

    return undefined;
  }, [query]);

  return matches;
}
