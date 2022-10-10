import React from 'react';
import moment from 'moment';
import { render, screen } from '@testing-library/react';

import CalendarPage from '..';
import { CalendarEvent } from '../../../types';

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
    description: 'Mock Description',
    location: 'Mock Location',
    calendarName: 'Mock Calendar',
  },
  {
    id: '2',
    title: 'Mock Event',
    startTime: secondStart.date(12),
    endTime: secondStart.add(1, 'hours'),
    description: 'Mock Description',
    location: 'Mock Location',
    calendarName: 'Mock Calendar',
  },
  {
    id: '3',
    title: 'Mock Event',
    startTime: thirdStart.date(15),
    endTime: thirdStart.add(8, 'hours'),
    description: 'Mock Description',
    location: 'Mock Location',
    calendarName: 'Mock Calendar',
  },
  {
    id: '4',
    title: 'Mock Event',
    startTime: fourthStart.date(20),
    endTime: fourthStart.add(1, 'days'),
    description: 'Mock Description',
    location: 'Mock Location',
    calendarName: 'Mock Calendar',
  },
];

jest.mock('../../../hooks/useGCalAPI.ts', () => ({
  useGCalAPI: () => [mockEvents, jest.fn()],
}));

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
});
