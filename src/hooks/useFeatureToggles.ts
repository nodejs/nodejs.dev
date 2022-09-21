import { useContext, useEffect, useState } from 'react';
import { FeatureToggleContext } from '../containers/FeatureToggles';

export const useFeatureToggles = () => {
  const featureFlagContext = useContext(FeatureToggleContext);
  const [featureFlags, setFeatureFlags] = useState<string[]>([]);

  useEffect(() => setFeatureFlags(featureFlagContext), []);

  return {
    has: (feature: string) => featureFlags.includes(feature),
    getAll: () => featureFlags,
  };
};
