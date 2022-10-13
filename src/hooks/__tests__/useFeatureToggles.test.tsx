import React from 'react';
import { render } from '@testing-library/react';
import { useFeatureToggles } from '../useFeatureToggles';
import { FeatureToggleProvider } from '../../providers';

describe('useFeatureToggles', () => {
  const FeatureFlagRenderer = (): JSX.Element => {
    const featureFlags = useFeatureToggles();

    return (
      <>
        has:{featureFlags.has('feature-flag-mock') ? 'true' : 'false'},all:
        {featureFlags.getAll().toString()}
      </>
    );
  };

  it('should contain feature flag', () => {
    const localStorageGetSpy = jest
      .fn()
      .mockImplementation(() => '["feature-flag-mock"]');

    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: {
        getItem: localStorageGetSpy,
      },
    });

    const { container } = render(
      <FeatureToggleProvider>
        <FeatureFlagRenderer />
      </FeatureToggleProvider>
    );

    expect(localStorageGetSpy).toHaveBeenCalledWith('node_featureFlags');
    expect(container).toMatchSnapshot();
  });

  it('should not contain feature flag', () => {
    const localStorageGetSpy = jest.fn().mockImplementation(() => '[]');

    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: {
        getItem: localStorageGetSpy,
      },
    });

    const { container } = render(
      <FeatureToggleProvider>
        <FeatureFlagRenderer />
      </FeatureToggleProvider>
    );

    expect(localStorageGetSpy).toHaveBeenCalledWith('node_featureFlags');
    expect(container).toMatchSnapshot();
  });

  it('should work if localstorage item does not exist ', () => {
    const localStorageGetSpy = jest.fn().mockImplementation(() => null);

    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: {
        getItem: localStorageGetSpy,
      },
    });

    const { container } = render(
      <FeatureToggleProvider>
        <FeatureFlagRenderer />
      </FeatureToggleProvider>
    );

    expect(localStorageGetSpy).toHaveBeenCalledWith('node_featureFlags');
    expect(container).toMatchSnapshot();
  });
});
