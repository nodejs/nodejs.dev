export const useCopyToClipboard = () => {
  const copy = async (value: string) => {
    if (!(typeof navigator === 'object' && navigator.clipboard)) {
      return false;
    }
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch (__noop) {
      return false;
    }
  };

  return copy;
};
