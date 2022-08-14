import React from 'react';
import { render } from '../../../../test-utils.js';
import Navigation from '..';

describe('Navigation component', (): void => {
  it('renders correctly', (): void => {
    const { container } = render(
      <Navigation
        currentSlug="intro"
        category="category1"
        sections={{
          'Getting Started': {
            data: [
              {
                slug: 'intro',
                title: 'Section 1',
                section: '...',
                category: 'category1',
              },
            ],
            category: 'category1',
          },
          Versions: {
            data: [
              {
                slug: 'version',
                title: 'Version 1',
                section: '...',
                category: 'category2',
              },
            ],
            category: 'category2',
          },
        }}
        label=""
      />
    );
    expect(container).toMatchSnapshot();
  });
});
