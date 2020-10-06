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

    const listEle = getAllByRole('presentation');

    expect(listEle[0]).toHaveClass('download-card--inactive');

    fireEvent.click(listEle[0]);

    expect(listEle[0]).toHaveClass('download-card--active');
  });
});
