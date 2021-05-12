import { MutableRefObject, useEffect, useState } from 'react';

/**
 * Reusable hook detecting whether passed ref is visible on screen.
 * In case observeOnce=true - stops observing after first intersection.
 * @param ref
 * @param observeOnce
 */
// eslint-disable-next-line import/prefer-default-export
export function useOnScreen(
  ref: MutableRefObject<Element>,
  observeOnce: boolean
): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);

      if (observeOnce && entry.isIntersecting) {
        observer.disconnect();
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [observeOnce, ref]);

  return isIntersecting;
}
