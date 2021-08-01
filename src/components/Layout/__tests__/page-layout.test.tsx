import React from 'react';
import '../../../../test/__mocks__/intersectionObserverMock';
import { render } from '@testing-library/react';
import PageLayout from '../page';

describe('PageLayout component', () => {
  it('renders correctly with data', () => {
    const { container } = render(
      <PageLayout
        editPath="mock-editPath"
        html="mock-html"
        tableOfContents="mock-tableOfContents"
        title="mock-title"
        description="mock-description"
        authors={['mock-author']}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
