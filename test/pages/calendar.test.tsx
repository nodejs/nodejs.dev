import React from 'react';
import { render } from '@testing-library/react';
import CalendarPage from '../../src/pages/calendar';
import '../__mocks__/intersectionObserverMock';

describe('Calendar page', () => {
  it('renders correctly', () => {
    const { container } = render(<CalendarPage />);
    expect(container).toMatchSnapshot();
  });
});
