import { useEffect } from 'react';

export function useSetBodyOverflow(overflow: 'unset' | 'hidden') {
  useEffect(() => {
    if (typeof document === 'object' && document.body) {
      document.body.style.overflow = overflow;
    }
  }, [overflow]);
}
