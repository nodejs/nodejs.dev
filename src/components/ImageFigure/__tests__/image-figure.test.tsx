import React from 'react';
import { render } from '../../../../test-utils.js';
import ImageFigure from '..';

describe('ImageFigure component', () => {
  it('renders correctly with footer', () => {
    const { container } = render(
      <ImageFigure
        caption="mock-caption"
        src="mock-src"
        target="_self"
        alt="mock-alternate"
      />
    );
    expect(container).toMatchSnapshot();
  });
  it('renders correctly with default target', () => {
    const { container } = render(
      <ImageFigure caption="mock-caption" src="mock-src" alt="mock-alternate" />
    );
    expect(container).toMatchSnapshot();
  });
});
