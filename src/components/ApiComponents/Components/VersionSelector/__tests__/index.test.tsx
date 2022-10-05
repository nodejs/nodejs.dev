import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NodeReleaseData } from '../../../../../types';
import VersionSelector from '..';

describe('VersionSelector component', (): void => {
  const version = 'v0';
  const release: NodeReleaseData = {
    version,
    fullVersion: version,
    codename: 'test',
    isLts: true,
    status: 'Current',
    initialRelease: version,
    ltsStart: 'today',
    maintenanceStart: 'today',
    endOfLife: 'tomorrow',
  };
  const releases = [release];
  const currentPage = '1';

  it('renders correctly', () => {
    const apiAvailableVersions = [version];
    const { container } = render(
      <VersionSelector
        releases={releases}
        selectedRelease={version}
        apiAvailableVersions={apiAvailableVersions}
        currentPage={currentPage}
      />
    );
    expect(container).toMatchSnapshot();
  });

  describe('redirection', () => {
    let location: Location | null | undefined;
    let mockLocation;

    beforeEach(() => {
      location = window.location;
      mockLocation = jest.fn();
      // eslint-disable-next-line
      delete (window as any).location;
      // eslint-disable-next-line
      (window as any).location = mockLocation;
    });

    it('redirects to selected version', async () => {
      const apiAvailableVersions = [version];
      render(
        <VersionSelector
          releases={releases}
          selectedRelease={version}
          apiAvailableVersions={apiAvailableVersions}
          currentPage={currentPage}
        />
      );
      const optionComponent = screen.getByRole('combobox');
      fireEvent.change(optionComponent, { target: { value: version } });
      const expectedUrl = `/api/${version}/${currentPage}`;
      expect(window.location.href).toEqual(expectedUrl);
    });

    it('redirects to latest version', async () => {
      const apiAvailableVersions = ['v1'];
      render(
        <VersionSelector
          releases={releases}
          selectedRelease={version}
          apiAvailableVersions={apiAvailableVersions}
          currentPage={currentPage}
        />
      );
      const optionComponent = screen.getByRole('combobox');
      fireEvent.change(optionComponent, { target: { value: version } });
      const expectedUrl = `https://nodejs.org/docs/latest-${version}.x/api/index.html`;
      expect(window.location.href).toEqual(expectedUrl);
    });

    afterEach(() => {
      // eslint-disable-next-line
      (window as any).location = location;
    });
  });
});
