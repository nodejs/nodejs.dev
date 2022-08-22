import React from 'react';
import { render } from '@testing-library/react';
import StyleGuidePage from '../style-guide';

describe('StyleGuide page', () => {
  it('renders correctly', () => {
    const { container } = render(<StyleGuidePage />);
    expect(container).toMatchSnapshot();
  });
});
