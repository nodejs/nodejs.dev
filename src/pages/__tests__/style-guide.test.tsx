import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import StyleGuidePage from '../style-guide';

expect.extend(toHaveNoViolations);

describe('StyleGuide page', () => {
  it('renders correctly', () => {
    const { container } = render(<StyleGuidePage />);
    expect(container).toMatchSnapshot();
  });
  it('has no accessibility violations', async () => {
    const { container } = render(<StyleGuidePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
