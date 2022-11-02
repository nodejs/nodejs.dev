import React from 'react';
import { render } from '@testing-library/react';
import DownloadTable from '..';
import { createNodeReleasesData } from '../../../../../__fixtures__/page';

describe('DownloadTable component', (): void => {
  it('renders correctly', (): void => {
    const { container } = render(
      <DownloadTable nodeReleasesData={createNodeReleasesData()} />
    );
    expect(container).toMatchSnapshot();
  });
});
