import React from 'react';
import { render } from '@testing-library/react';
import { createNodeReleasesData } from '../../../../__fixtures__/page';

import Hero from '..';

const mockReleaseData = createNodeReleasesData();

describe('Hero component', () => {
  it('renders correctly', () => {
    const title = 'Introduction to Node.js';
    const subTitle = 'Mock SubTitle';
    const { container } = render(
      <Hero
        title={title}
        subTitle={subTitle}
        nodeReleaseData={mockReleaseData}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
