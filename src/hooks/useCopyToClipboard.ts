import { useEffect, useState } from 'react';

export const copyToClipboard = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
};

export const useCopyToClipboard = (): [
  boolean,
  (text: string) => Promise<boolean>
] => {
  const [copied, setCopied] = useState(false);

  async function copyText(text: string) {
    const isCopied = await copyToClipboard(text);
    setCopied(isCopied);
    return isCopied;
  }

  useEffect(() => {
    if (!copied) return undefined;

    const timerId = setTimeout(() => setCopied(false), 3000);
    return () => {
      clearTimeout(timerId);
    };
  }, [copied]);

  return [copied, copyText];
};
