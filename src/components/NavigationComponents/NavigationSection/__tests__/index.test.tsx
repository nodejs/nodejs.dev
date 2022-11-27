import React from 'react';
import { render } from '@testing-library/react';
import NavigationSection from '../index';

describe('NavigationSection component', (): void => {
  it('renders correctly', (): void => {
    const label = 'API Navigation Section';
    const isOpen = false;
    const mockTitle = <h1>Mock Title</h1>;
    const mockContent = <p>Mock content</p>;
    const { container } = render(
      <NavigationSection
        isOpen={isOpen}
        label={label}
        title={mockTitle}
        content={mockContent}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
