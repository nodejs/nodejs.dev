import React, { createContext, useMemo } from 'react';

type Props = { children?: React.ReactNode };

const FEATURE_FLAGS_STORAGE = 'node_featureFlags';

export const FeatureToggleContext = createContext<string[]>([]);

export const FeatureToggleProvider: React.FC<Props> = ({ children }) => {
  const featureFlags = useMemo(() => {
    try {
      const storageItem = localStorage.getItem(FEATURE_FLAGS_STORAGE) || '[]';

      const parsedItem = JSON.parse(storageItem);

      // We want to guarantee the parsedItem is truthy and and Array
      if (parsedItem && Array.isArray(parsedItem)) {
        // Lastly we filter non-string objects as we want to avoid code injection such as XSS
        // from starting from our feature flags
        return [...parsedItem].filter(f => typeof f === 'string' && f.length);
      }

      return [];
    } catch (__noop) {
      // We don't care if the JSON.parse or localStorage.getItem fail
      // as we will just disable the feature flags then
      return [];
    }
  }, []);

  return (
    <FeatureToggleContext.Provider value={featureFlags}>
      {children}
    </FeatureToggleContext.Provider>
  );
};
