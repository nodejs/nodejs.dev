import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import CollabSummitPage from '..';
import { createGeneralPageData } from '../../../__fixtures__/page';

const mockData = createGeneralPageData();
expect.extend(toHaveNoViolations);

describe('CollabSummit page', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<CollabSummitPage data={mockData.data} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
