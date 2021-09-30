import React from 'react';
import { render } from '@testing-library/react';

import { createNodeReleasesDataDetail } from '../../../../test/__fixtures__/page';

import Hero from '..';

const mockReleaseData = createNodeReleasesDataDetail();
const mockNodeReleasesLTSVersion = mockReleaseData.map(release => ({
  version: release.version,
  lts: release.lts,
}));

describe('Hero component', () => {
  it('renders correctly', () => {
    const title = 'Introduction to Node.js';
    const subTitle = 'Mock SubTitle';
    const { container } = render(
      <Hero
        title={title}
        subTitle={subTitle}
        nodeReleasesLTSVersion={mockNodeReleasesLTSVersion}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
