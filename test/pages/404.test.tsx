import React from 'react';
import NotFound from '../../src/pages/404';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('404 page', () => {
  it('renders correctly', () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<NotFound />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
