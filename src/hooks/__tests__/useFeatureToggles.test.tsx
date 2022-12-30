import React from 'react';
import { render } from '@testing-library/react';
import { useFeatureToggles } from '../useFeatureToggles';
import { appStorage } from '../useStorage';
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

  const setItemMock = jest.fn();
  const getItemMock = jest.fn();

  beforeEach(() => {
    Storage.prototype.setItem = setItemMock;
    Storage.prototype.getItem = getItemMock;

    appStorage.clear();
  });

  afterEach(() => {
    setItemMock.mockRestore();
    getItemMock.mockRestore();
  });

  it('should contain feature flag', () => {
    getItemMock.mockReturnValue('["feature-flag-mock"]');

    const { container } = render(
      <FeatureToggleProvider>
        <FeatureFlagRenderer />
      </FeatureToggleProvider>
    );

    expect(getItemMock).toHaveBeenCalledWith('node_featureFlags');
    expect(container).toMatchSnapshot();
  });

  it('should not contain feature flag', () => {
    getItemMock.mockReturnValue('[]');

    const { container } = render(
      <FeatureToggleProvider>
        <FeatureFlagRenderer />
      </FeatureToggleProvider>
    );

    expect(getItemMock).toHaveBeenCalledWith('node_featureFlags');
    expect(container).toMatchSnapshot();
  });

  it('should work if localstorage item does not exist ', () => {
    getItemMock.mockReturnValue(null);

    const { container } = render(
      <FeatureToggleProvider>
        <FeatureFlagRenderer />
      </FeatureToggleProvider>
    );

    expect(getItemMock).toHaveBeenCalledWith('node_featureFlags');
    expect(container).toMatchSnapshot();
  });
});
