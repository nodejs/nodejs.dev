import React from 'react';
import Calendar from '@ericz1803/react-google-calendar';
import Layout from '../components/Layout';

const API_KEY =
  process.env.GATSBY_REACT_APP_GCAL_API_KEY ||
  'AIzaSyCBklATFMNjWUjJVZswlTmoyZh27FbaHDQ';

const calendars = [
  {
    calendarId:
      'nodejs.org_nr77ama8p7d7f9ajrpnu506c98@group.calendar.google.com',
  },
];

const styles = {
  calendar: `
    border-color: var(--color-border-primary);
    color: var(--color-text-primary);
  `,
  eventText: `
    color: var(--color-text-primary);
  `,
  eventCircle: `
    color: var(--color-brand-primary);
  `,
  today: `
    border: var(--space-04) solid var(--color-border-accent);
  `,
  tooltip: `
    color: var(--color-text-primary);
    background-color: var(--color-fill-card);
  `,
};

export default function CalendarPage(): JSX.Element {
  return (
    <Layout title="Node.js Calendar" description="Node.js upcoming events">
      <Calendar
        apiKey={API_KEY}
        calendars={calendars}
        styles={styles}
        showFooter={false}
      />
    </Layout>
  );
}
