import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import DownloadCards from '..';
import { UserOS } from '../../../util/detectOS';

describe('DownloadCards component', (): void => {
  it('renders correctly', (): void => {
    const { container } = render(<DownloadCards userOS={UserOS.WIN} />);
    expect(container).toMatchSnapshot();
  });

  it('check click handler on DownloadCards component', (): void => {
    const { getAllByRole } = render(<DownloadCards userOS={UserOS.MAC} />);

    const listElement = getAllByRole('presentation');

    expect(listElement[0]).toHaveClass('download-card--inactive');

    fireEvent.click(listElement[0]);

    expect(listElement[0]).toHaveClass('download-card--active');
  });

  it('check left and right arrow click handler on DownloadCards component', (): void => {
    const { getByRole, getAllByRole } = render(
      <DownloadCards userOS={UserOS.MAC} />
    );

    const tabListElement = getByRole('tablist');
    const listElement = getAllByRole('presentation');

    expect(listElement[0]).toHaveClass('download-card--inactive');

    /**
     * First left click from default OS of MAC
     */
    fireEvent.keyDown(tabListElement, {
      key: 'ArrowLeft',
      code: 'LeftArrowKey',
    });

    expect(listElement[0]).toHaveClass('download-card--active');
    expect(listElement[1]).toHaveClass('download-card--inactive');
    expect(listElement[2]).toHaveClass('download-card--inactive');

    /**
     * Left click from WIN
     */
    fireEvent.keyDown(tabListElement, {
      key: 'ArrowLeft',
      code: 'LeftArrowKey',
    });

    expect(listElement[0]).toHaveClass('download-card--inactive');
    expect(listElement[1]).toHaveClass('download-card--inactive');
    expect(listElement[2]).toHaveClass('download-card--active');

    /**
     * Right click from SOURCECODE
     */

    fireEvent.keyDown(tabListElement, {
      key: 'ArrowRight',
      code: 'RightArrowKey',
    });

    expect(listElement[0]).toHaveClass('download-card--active');
    expect(listElement[1]).toHaveClass('download-card--inactive');
    expect(listElement[2]).toHaveClass('download-card--inactive');
  });
});
