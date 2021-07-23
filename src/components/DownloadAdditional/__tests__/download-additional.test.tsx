import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DownloadAdditional from '..';

describe('DownloadAdditional component', (): void => {
  const releaseData = {
    version: 'version',
    lts: '',
    npm: '6.14.8',
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
    userEvent.click(downloadItem);

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
    userEvent.click(downloadItem);
    // collapse it back to check all relevant html classes was set
    userEvent.click(downloadItem);

    expect(container).toMatchSnapshot();
  });
});
