import React from 'react';
import Calendar from '@ericz1803/react-google-calendar';
import Layout from '../components/Layout';
import { css } from "@emotion/react";
export default function CalendarPage(): JSX.Element {
  // I've locked down the key in GCP so for demo purposes I'm ok displaying it.
	const API_KEY = process.env.GATSBY_REACT_APP_GCAL || 'AIzaSyAmQQvNGwK9lVPsSNF_aoVoytUrE0Jr1FA';
	let calendars = [
		{ calendarId: 'nodejs.org_nr77ama8p7d7f9ajrpnu506c98@group.calendar.google.com' }
	];

let styles = {
  eventText: css`
  color: var(--black9)
  `,
  eventCircle: css`
  color: var(--brand6)
  `,
  tooltip: css`
  color: var(--primary-text-color)
  background-color: var(--black9)
  `
}
  
	return (
		<Layout title="Node.js Calendar" description="Node.js upcoming events">
			<Calendar apiKey={API_KEY} calendars={calendars} styles={styles} />
		</Layout>
	);
}
