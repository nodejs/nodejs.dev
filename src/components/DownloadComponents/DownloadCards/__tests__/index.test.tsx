import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';

import DownloadCards from '..';
import { UserOS } from '../../../../util/detectOS';

describe('DownloadCards component', (): void => {
  it('renders correctly', (): void => {
    const { container } = render(<DownloadCards userOS={UserOS.WIN} />);
    expect(container).toMatchSnapshot();
  });

  it('check click handler on DownloadCards component', async () => {
    render(<DownloadCards userOS={UserOS.MAC} />);

    const listElement = screen.getAllByRole('tab');

    expect(listElement[0]).toHaveClass('downloadCard');

    await userEvent.click(listElement[0]);

    expect(listElement[0]).toHaveClass('downloadCard downloadCardActive');
  });

  it('check left and right arrow click handler on DownloadCards component', (): void => {
    render(<DownloadCards userOS={UserOS.MAC} />);

    const tabListElement = screen.getByRole('tablist');
    const listElement = screen.getAllByRole('tab');

    expect(listElement[0]).toHaveClass('downloadCard');

    /**
     * First left click from default OS of MAC
     */
    fireEvent.keyDown(tabListElement, {
      key: 'ArrowLeft',
      code: 'LeftArrowKey',
    });

    expect(listElement[0]).toHaveClass('downloadCard downloadCardActive');
    expect(listElement[1]).toHaveClass('downloadCard');
    expect(listElement[2]).toHaveClass('downloadCard');

    /**
     * Left click from WIN
     */
    fireEvent.keyDown(tabListElement, {
      key: 'ArrowLeft',
      code: 'LeftArrowKey',
    });

    expect(listElement[0]).toHaveClass('downloadCard');
    expect(listElement[1]).toHaveClass('downloadCard');
    expect(listElement[2]).toHaveClass('downloadCard downloadCardActive');

    /**
     * Right click from SOURCECODE
     */

    fireEvent.keyDown(tabListElement, {
      key: 'ArrowRight',
      code: 'RightArrowKey',
    });

    expect(listElement[0]).toHaveClass('downloadCard downloadCardActive');
    expect(listElement[1]).toHaveClass('downloadCard');
    expect(listElement[2]).toHaveClass('downloadCard');
  });
});
