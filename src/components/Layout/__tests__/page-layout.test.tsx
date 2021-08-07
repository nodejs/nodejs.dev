import React from 'react';
import '../../../../test/__mocks__/intersectionObserverMock';
import { render } from '@testing-library/react';
import PageLayout from '../page';
import { mockTableOfContents } from '../../../../test/__fixtures__/page';
import mockMDXBodyContent from '../../../../test/__fixtures__/mockMDXBodyContent';

describe('PageLayout component', () => {
  it('renders correctly with data', () => {
    const { container } = render(
      <PageLayout
        editPath="mock-editPath"
        body={mockMDXBodyContent}
        tableOfContents={mockTableOfContents}
        title="mock-title"
        description="mock-description"
        authors={['mock-author']}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
