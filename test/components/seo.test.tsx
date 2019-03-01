import React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import SEO from '../../src/components/seo';

describe('SEO component', () => {
  it('renders correctly', () => {
    const renderer = ShallowRenderer.createRenderer();
    const title = 'title-mock';
    const description = 'description-mock';
    const img = 'image-mock';
    renderer.render(
      <SEO
        title={title}
        description={description}
        img={img}
      />
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
  it('uses config properties as fallback for missing props', () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<SEO />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
