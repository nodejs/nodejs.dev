import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

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
});
