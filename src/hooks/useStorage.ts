import { useEffect } from 'react';

import safeJSON from '../../util-node/safeJSON';

// Creates a permanent storage to be used between all the parts of the Application
// So it doesn't matter where this hook gets created it will be global.
// Note.: This could be moved within a Provider to move it to a React-isolated context-tree instead of a global runtime one.
export const appStorage = new Map<string, string>();

const syncWithBrowser = () => {
  if (typeof localStorage === 'object') {
    return {
      sendToBrowser: (k: string, v: string) => localStorage.setItem(k, v),
      getFromBrowser: (k: string) => localStorage.getItem(k) || undefined,
    };
  }

  return {
    sendToBrowser: () => undefined,
    getFromBrowser: () => undefined,
  };
};

export const useStorage = () => {
  const { sendToBrowser, getFromBrowser } = syncWithBrowser();

  const setItem = (key: string, value: unknown) =>
    appStorage.set(key, safeJSON.toString(value));

  const getItem = (key: string) => {
    // Attempts to retrieve items from the App Storage, but if they don't exist yet
    // They might exist in the Browser Local Storage. This is useful as we retrieve things
    // From the Web Storage API only if they don't exist in the App Storage
    const storageItem = appStorage.get(key) || getFromBrowser(key);
    const parsedValue = storageItem ? safeJSON.parse(storageItem) : undefined;

    // If a said item doesn't exist in the App Storage we will create one
    // On the App Storage that will either be the value from the Web Storage if it exists
    // Or `undefined`. This is an interesting approach as it will ensure that all requested keys
    // at one point will exist in the Web Storage, and keeps things in sync.
    if (!appStorage.has(key) && parsedValue) {
      setItem(key, parsedValue);
    }

    return parsedValue;
  };

  const flushToStorage = () =>
    [...appStorage.entries()].forEach(([k, v]) => sendToBrowser(k, v));

  useEffect(() => {
    // Instead of flushing to the localStorage on every change, we flush once the Application
    // is being unloaded, so it allows us to update all changes at once instead of constantly
    // invoking the Web Storage APIs for every change we need, as the "authoritative storage" is the app itself
    window.addEventListener('unload', flushToStorage);

    return () => window.removeEventListener('unload', flushToStorage);
  }, []);

  return { getItem, setItem };
};
