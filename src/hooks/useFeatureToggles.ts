import { useContext } from 'react';
import { FeatureToggleContext } from '../components/FeatureToggleProvider';

export const useFeatureToggles = () => {
  const featureFlags = useContext(FeatureToggleContext);

  return {
    has: (feature: string) => featureFlags.includes(feature),
    getAll: () => featureFlags,
  };
};
