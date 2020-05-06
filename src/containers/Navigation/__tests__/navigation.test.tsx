import React from 'react';
import renderer from 'react-test-renderer';
import Navigation from '..';

describe('Navigation component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Navigation
          currentSlug="intro"
          sections={{
            'Getting Started': [
              {
                slug: 'intro',
                title: 'Section 1',
                section: '...',
              },
            ],
            Versions: [
              {
                slug: 'version',
                title: 'Version 1',
                section: '...',
              },
            ],
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
