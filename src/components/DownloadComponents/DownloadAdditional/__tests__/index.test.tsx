import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import DownloadAdditional from '..';
import { createNodeReleasesData } from '../../../../__fixtures__/page';

describe('DownloadAdditional component', (): void => {
  const releaseData = createNodeReleasesData();

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
        line={releaseData[0]}
        selectedTypeRelease="LTS"
        handleTypeReleaseToggle={(): null => null}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('allows to expand items', async () => {
    const { container } = render(
      <DownloadAdditional
        line={releaseData[0]}
        selectedTypeRelease="LTS"
        handleTypeReleaseToggle={(): null => null}
      />
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const downloadItem = container.querySelector(
      '.download-additional__item'
    ) as Element;

    // expand installers list
    await userEvent.click(downloadItem);

    expect(container).toMatchSnapshot();
  });

  it('allows to collapse expanded items', async () => {
    const { container } = render(
      <DownloadAdditional
        line={releaseData[0]}
        selectedTypeRelease="LTS"
        handleTypeReleaseToggle={(): null => null}
      />
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const downloadItem = container.querySelector(
      '.download-additional__item'
    ) as Element;

    // expand installers list
    await userEvent.click(downloadItem);
    // collapse it back to check all relevant html classes was set
    await userEvent.click(downloadItem);

    expect(container).toMatchSnapshot();
  });
});
