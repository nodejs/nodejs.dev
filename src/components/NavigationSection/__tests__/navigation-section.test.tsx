import React from 'react';
import { render } from '@testing-library/react';
import NavigationSection from '..';

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
        readSections={new Set()}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
