import React from 'react';
import renderer from 'react-test-renderer';
import DownloadAdditional from '..';

describe('DownloadAdditional component', (): void => {
  it('renders correctly', (): void => {
    const tree = renderer
      .create(
        <DownloadAdditional
          selectedTypeRelease="LTS"
          handleTypeReleaseToggle={(): null => null}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
