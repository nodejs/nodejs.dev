import React from 'react';
import Landing from '../../src/pages/index';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('Landing page', () => {
  it('renders correctly', () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<Landing />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
