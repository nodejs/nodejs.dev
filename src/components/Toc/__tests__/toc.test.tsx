import React from 'react';
import { render } from '@testing-library/react';
import TOC from '..';
import { mockTableOfContents } from '../../../../test/__fixtures__/page';

describe('TOC component', () => {
  it('renders correctly', () => {
    const heading = 'TABLE OF CONTENTS';
    const { container } = render(
      <TOC heading={heading} tableOfContents={mockTableOfContents} />
    );
    expect(container).toMatchSnapshot();
  });
  it('render empty div without a table of contents', () => {
    const heading = 'TABLE OF CONTENTS';
    const tableOfContents = undefined;
    const { container } = render(
      <TOC heading={heading} tableOfContents={tableOfContents} />
    );
    expect(container).toMatchSnapshot();
  });
});
