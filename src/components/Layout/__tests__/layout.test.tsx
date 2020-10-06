/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import renderer from 'react-test-renderer';
import Layout from '..';

describe('Layout component', () => {
  it('renders correctly with data', () => {
    const tree = renderer
      .create(
        <Layout
          title="mock-title"
          description="mock-description"
          img="mock-image-url"
          showFooter={false}
        >
          mock-children
        </Layout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
