import React from 'react';
import { render } from '@testing-library/react';
import DownloadHeader from '..';

describe('DownloadHeader component', (): void => {
  it('renders correctly', (): void => {
    const { container } = render(
      <DownloadHeader
        release={{
          lts: '',
          npm: '6.14.8',
          version: 'v14.11.0',
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
