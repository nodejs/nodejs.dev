import React from 'react';
import { render } from '@testing-library/react';
import SearchInput from '../SearchInput';

describe('SearInput component', () => {
  it('should render correctly', () => {
    const view = render(
      <SearchInput
        localSearchLearnPages={{
          index: {
            version: '0.9.5',
            fields: [],
            ref: 'title',
            pipeline: [],
            documentStore: {
              docInfo: {},
              docs: {},
            },
            index: {},
          },
        }}
      />
    );
    expect(view).toMatchSnapshot();
  });
});
