import React from 'react';
import { render } from '@testing-library/react';
import SearchInput from '../SearchInput';

jest.mock('react-use-flexsearch');
describe('SearInput component', () => {
  it('should render correctly', () => {
    const component = render(
      <SearchInput
        localSearchLearnPages={{
          id: '',
          store: '',
          index: [],
        }}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
