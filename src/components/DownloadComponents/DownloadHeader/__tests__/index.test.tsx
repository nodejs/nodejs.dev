import React from 'react';
import { render } from '@testing-library/react';
import DownloadHeader from '..';
import { createNodeReleasesData } from '../../../../__fixtures__/page';

describe('DownloadHeader component', (): void => {
  it('renders correctly', (): void => {
    const { container } = render(
      <DownloadHeader release={createNodeReleasesData()[0]} />
    );
    expect(container).toMatchSnapshot();
  });
});
