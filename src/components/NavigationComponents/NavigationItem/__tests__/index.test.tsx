import React from 'react';
import { render } from '@testing-library/react';
import NavigationItem from '../index';

describe('NavigationItem component', (): void => {
  it('renders correctly', (): void => {
    const slug = '/blog/anouncements/';
    const title = 'Anouncements';
    const isActive = false;
    const { container } = render(
      <NavigationItem slug={slug} title={title} isActive={isActive} />
    );

    expect(container).toMatchSnapshot();
  });
});
