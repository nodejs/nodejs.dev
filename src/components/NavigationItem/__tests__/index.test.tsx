import React from 'react';
import { render } from '@testing-library/react';
import NavigationItem from '..';

describe('NavigationItem component', (): void => {
  it('renders correctly', (): void => {
    const { container } = render(
      <NavigationItem
        key="123"
        isRead
        isActive
        slug="versioning"
        title="Versioning"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
