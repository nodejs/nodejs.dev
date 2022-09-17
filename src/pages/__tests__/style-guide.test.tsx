import React from 'react';
import { render } from '@testing-library/react';
import StyleGuidePage from '../style-guide';
import { axe, toHaveNoViolations } from 'jest-axe';

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
