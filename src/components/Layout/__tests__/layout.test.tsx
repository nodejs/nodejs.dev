import React from 'react';
import { render } from '../../../../test-utils.js';
import Layout from '..';

describe('Layout component', () => {
  it('renders correctly with data', () => {
    const { container } = render(
      <Layout
        title="mock-title"
        description="mock-description"
        img="mock-image-url"
        showFooter={false}
      >
        mock-children
      </Layout>
    );
    expect(container).toMatchSnapshot();
  });
});
