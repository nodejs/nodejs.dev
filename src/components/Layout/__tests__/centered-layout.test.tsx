import React from 'react';
import { render } from '../../../../test-utils.js';
import CenteredLayout from '../centered';
import '../../../../test/__mocks__/intersectionObserverMock';

describe('CenteredLayout component', () => {
  it('renders correctly with footer', () => {
    const { container } = render(
      <CenteredLayout
        title="mock-title"
        description="mock-description"
        img="mock-image-url"
      >
        mock-children
      </CenteredLayout>
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly without footer', () => {
    const { container } = render(
      <CenteredLayout
        title="mock-title"
        description="mock-description"
        img="mock-image-url"
        showFooter={false}
      >
        mock-children
      </CenteredLayout>
    );
    expect(container).toMatchSnapshot();
  });
});
