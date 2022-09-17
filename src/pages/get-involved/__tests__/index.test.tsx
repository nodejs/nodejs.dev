import React from 'react';
import { render } from '@testing-library/react';
import GetInvolvedPage from '..';
import { createGeneralPageData } from '../../../__fixtures__/page';
import { axe, toHaveNoViolations } from 'jest-axe';

const mockData = createGeneralPageData();
expect.extend(toHaveNoViolations);

describe('GetInvolved page', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<GetInvolvedPage data={mockData.data} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});