import React, { createContext, useMemo } from 'react';
import { useStorage } from '../../hooks/useStorage';

type Props = { children?: React.ReactNode };

const FEATURE_FLAGS_STORAGE = 'node_featureFlags';

export const FeatureToggleContext = createContext<string[]>([]);

export const FeatureToggleProvider: React.FC<Props> = ({ children }) => {
  const { getItem } = useStorage();

  const featureFlags = useMemo(() => {
    const parsedItem = getItem(FEATURE_FLAGS_STORAGE) || [];

    // We want to guarantee the parsedItem is truthy and and Array
    if (parsedItem && Array.isArray(parsedItem)) {
      // Lastly we filter non-string objects as we want to avoid code injection such as XSS
      // from starting from our feature flags
      return [...parsedItem].filter(f => typeof f === 'string' && f.length);
    }

    return [];
  }, [getItem]);

  return (
    <FeatureToggleContext.Provider value={featureFlags}>
      {children}
    </FeatureToggleContext.Provider>
  );
};
