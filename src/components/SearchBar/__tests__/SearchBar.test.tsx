import React from 'react';
import { render } from '@testing-library/react';
import SearchBar from '..';

describe('SearInput component', () => {
  it('should render correctly', () => {
    const view = render(<SearchBar />);
    expect(view).toMatchSnapshot();
  });
});
