import { useEffect, useState } from 'react';

export function useClipboardCopy(timeout = 3000) {
  const [copied, setCopied] = useState(false);

  const copy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
  };

  useEffect((): (() => void) => {
    let timer: ReturnType<typeof setTimeout>;

    if (copied) {
      timer = setTimeout(() => setCopied(false), timeout);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [copied, timeout]);

  return {
    copied,
    copy,
  };
}
