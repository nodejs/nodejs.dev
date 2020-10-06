import React from 'react';
import renderer from 'react-test-renderer';
import CenteredLayout from '../centered';

describe('CenteredLayout component', () => {
  it('renders correctly with footer', () => {
    const tree = renderer
      .create(
        <CenteredLayout
          title="mock-title"
          description="mock-description"
          img="mock-image-url"
          showFooter
        >
          mock-children
        </CenteredLayout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly without footer', () => {
    const tree = renderer
      .create(
        <CenteredLayout
          title="mock-title"
          description="mock-description"
          img="mock-image-url"
          showFooter={false}
        >
          mock-children
        </CenteredLayout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
