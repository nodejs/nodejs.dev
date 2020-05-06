import React from 'react';
import renderer from 'react-test-renderer';
import NavigationSection from '..';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop(): void {}

describe('NavigationSection component', (): void => {
  it('renders correctly', (): void => {
    const tree = renderer
      .create(
        <NavigationSection
          key="123"
          title="Introduction"
          section={[
            {
              slug: 'intro',
              title: 'Section 1',
              section: '...',
            },
          ]}
          currentSlug=""
          onItemClick={noop}
          readSections={new Set()}
          autoScroll={noop}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
