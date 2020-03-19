import React from 'react';
import renderer from 'react-test-renderer';
import Layout from '../../src/components/layout';
import { createLayoutData } from '../__fixtures__/layout';

describe('Layout component', () => {
  it('renders correctly', () => {
    const layoutData = createLayoutData();
    const { title, description, children, showFooter } = layoutData;
    const tree = renderer
      .create(
        <Layout title={title} description={description} showFooter={showFooter}>
          {children}
        </Layout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly without footer', () => {
    const layoutData = createLayoutData();
    const { title, description, children, showFooter } = layoutData;
    const tree = renderer
      .create(
        <Layout title={title} description={description} showFooter={false}>
          {children}
        </Layout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
