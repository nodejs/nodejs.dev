import React from 'react';
import renderer from 'react-test-renderer';
import NavigationSection from '../../src/components/navigation-section';

describe('NavigationSection component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <NavigationSection
          key={'123'}
          title={'Introduction'}
          section={[
            {
              slug: 'intro',
              title: 'Section 1',
              section: '...',
            },
          ]}
          currentSlug={''}
          onItemClick={console.log}
          readSections={new Set()}
          autoScroll={console.log}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
