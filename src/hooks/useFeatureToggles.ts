import { useContext } from 'react';
import { FeatureToggleContext } from '../containers/FeatureToggles';

export const useFeatureToggles = () => {
  const featureFlags = useContext(FeatureToggleContext);

  return {
    has: (feature: string) => featureFlags.includes(feature),
    getAll: () => featureFlags,
  };
};
