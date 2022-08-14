import React from 'react';
import { render } from '../../../../test-utils.js';
import NavigationSection from '..';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop(): void {}

describe('NavigationSection component', (): void => {
  it('renders correctly', (): void => {
    const { container } = render(
      <NavigationSection
        key="123"
        title="Introduction"
        section={[
          {
            slug: 'intro',
            title: 'Section 1',
            section: '...',
            category: 'null',
          },
        ]}
        currentSlug=""
        onItemClick={noop}
        readSections={new Set()}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
