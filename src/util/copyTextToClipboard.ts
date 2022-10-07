export const copyTextToClipboard = (value: string) => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return Promise.resolve(false);
  }

  return navigator.clipboard
    .writeText(value)
    .then(() => true)
    .catch(() => false);
};
