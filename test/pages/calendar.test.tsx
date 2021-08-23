import React from 'react';
import moment from 'moment';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CalendarPage from '../../src/pages/calendar';
import '../__mocks__/intersectionObserverMock';
import { CalendarEvent } from '../../src/types';

const firstStart = moment();
const secondStart = moment();
const thirdStart = moment();
const fourthStart = moment();

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Mock Event',
    startTime: firstStart.date(4),
    endTime: firstStart.add(5, 'hours'),
  },
  {
    id: '2',
    title: 'Mock Event',
    startTime: secondStart.date(12),
    endTime: secondStart.add(1, 'hours'),
  },
  {
    id: '3',
    title: 'Mock Event',
    startTime: thirdStart.date(15),
    endTime: thirdStart.add(8, 'hours'),
  },
  {
    id: '4',
    title: 'Mock Event',
    startTime: fourthStart.date(20),
    endTime: fourthStart.add(1, 'days'),
  },
];

jest.mock('../../src/hooks/useGCalAPI.tsx', () => {
  return {
    useGCalAPI: () => [mockEvents, jest.fn()],
  };
});

describe('Calendar page', () => {
  it('renders table element', () => {
    render(<CalendarPage />);

    const calendarElm = screen.getByRole('table');
    expect(calendarElm).toBeInTheDocument();
  });

  it('defaults to current month and year', async () => {
    const currentMonthYear = moment().format('MMMM YYYY');

    render(<CalendarPage />);

    const calendarTitleMonthYear = await screen.findByText(currentMonthYear);
    expect(calendarTitleMonthYear).toBeInTheDocument();
  });

  it('displays events', async () => {
    render(<CalendarPage />);

    const events = await screen.findAllByTitle('Mock Event');
    expect(events.length).toBe(4);
  });

  // TODO: Unable to get tooltip to render
  it.skip('clicking event shows tooltip', async () => {
    render(<CalendarPage />);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    const events = await screen.findAllByTitle('Mock Event');

    userEvent.click(events[0]);

    const tooltipElm = await screen.findByRole('tooltip');
    expect(tooltipElm).toBeInTheDocument();
  });
});
