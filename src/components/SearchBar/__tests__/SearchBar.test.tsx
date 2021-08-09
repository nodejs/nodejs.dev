import React from 'react';
import { render } from '@testing-library/react';
import SearchBar from '..';

describe('Searbar component', () => {
  it.only('should render correctly', () => {
    const component = render(<SearchBar />);
    expect(component).toMatchSnapshot();
  });
});
