import React from 'react';
import { render } from '@testing-library/react';
import SearchBar from '..';

describe('SearchBar component', () => {
  it('should render correctly', () => {
    const view = render(<SearchBar />);
    expect(view).toMatchSnapshot();
  });
});
