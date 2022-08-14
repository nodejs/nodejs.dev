import React from 'react';
import { render } from '../../test-utils.js';
import StyleGuidePage from '../../src/pages/style-guide';

describe('StyleGuide page', () => {
  it('renders correctly', () => {
    const { container } = render(<StyleGuidePage />);
    expect(container).toMatchSnapshot();
  });
});
