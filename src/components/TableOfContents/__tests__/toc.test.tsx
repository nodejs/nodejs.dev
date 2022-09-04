import React from 'react';
import { render } from '@testing-library/react';
import TableOfContents from '..';
import { mockTableOfContents } from '../../../__fixtures__/page';

describe('TOC component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <TableOfContents tableOfContents={mockTableOfContents} />
    );
    expect(container).toMatchSnapshot();
  });
  it('render empty div without a table of contents', () => {
    const tableOfContents = undefined;
    const { container } = render(
      <TableOfContents tableOfContents={tableOfContents} />
    );
    expect(container).toMatchSnapshot();
  });
});
