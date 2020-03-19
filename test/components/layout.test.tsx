import React from 'react';
import renderer from 'react-test-renderer';
import Layout from '../../src/components/layout';

describe('Layout component', () => {
  it('renders correctly', () => {
    const title = 'TEST TITLE';
    const description = 'This is a discription.';
    const tree = renderer
      .create(
        <Layout title={title} description={description} showFooter={true}>
          <span>Test Content</span>
        </Layout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly without footer', () => {
    const title = 'TEST TITLE';
    const description = 'This is a discription.';
    const tree = renderer
      .create(
        <Layout title={title} description={description} showFooter={false}>
          <span>Test Content</span>
        </Layout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
