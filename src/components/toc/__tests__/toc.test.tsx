import React from 'react';
import renderer from 'react-test-renderer';
import TOC from '../toc';

describe('TOC component', () => {
  it('renders correctly', () => {
    const heading = 'TABLE OF CONTENTS';
    const tableOfContents = 'mock-toc';
    const tree = renderer
      .create(<TOC heading={heading} tableOfContents={tableOfContents} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('does not render without a table of contents', () => {
    const heading = 'TABLE OF CONTENTS';
    const tableOfContents = null;
    const tree = renderer.create(
      <TOC heading={heading} tableOfContents={tableOfContents} />
    );
    expect(tree.getInstance()).toBeNull();
  });
});
