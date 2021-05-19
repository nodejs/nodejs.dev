import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import DownloadAdditional from '..';

describe('DownloadAdditional component', (): void => {
  const releaseData = {
    date: 'date',
    version: 'version',
    files: [],
    lts: true,
    v8: 'v8',
  };

  it('renders correctly', (): void => {
    const { container } = render(
      <DownloadAdditional
        selectedTypeRelease="LTS"
        handleTypeReleaseToggle={(): null => null}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with release data', (): void => {
    const { container } = render(
      <DownloadAdditional
        line={releaseData}
        selectedTypeRelease="LTS"
        handleTypeReleaseToggle={(): null => null}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('allows to expand items', () => {
    const { container } = render(
      <DownloadAdditional
        line={releaseData}
        selectedTypeRelease="LTS"
        handleTypeReleaseToggle={(): null => null}
      />
    );

    const downloadItem = container.querySelector(
      '.download-additional__item'
    ) as Element;

    // expand installers list
    fireEvent.click(downloadItem);

    expect(container).toMatchSnapshot();
  });

  it('allows to collapse expanded items', () => {
    const { container } = render(
      <DownloadAdditional
        line={releaseData}
        selectedTypeRelease="LTS"
        handleTypeReleaseToggle={(): null => null}
      />
    );

    const downloadItem = container.querySelector(
      '.download-additional__item'
    ) as Element;

    // expand installers list
    fireEvent.click(downloadItem);
    // collapse it back to check all relevant html classes was set
    fireEvent.click(downloadItem);

    expect(container).toMatchSnapshot();
  });
});
