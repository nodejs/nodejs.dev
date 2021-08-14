import React from 'react';
import { render } from '@testing-library/react';
import SearchInput from '..';

describe('Searbar component', () => {
  it('should render correctly', () => {
    const component = render(<SearchInput />);
    expect(component).toMatchSnapshot();
  });
});
