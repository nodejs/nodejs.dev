import { useState, useEffect } from 'react';
import moment from 'moment';
import { CalendarEvent, GCalResponse } from '../types';
import {
  loadGAPI,
  getEvents,
  processEvents,
  getRenderedEvents,
} from '../util/gcalUtils';
import config from '../config.json';

// eslint-disable-next-line import/prefer-default-export
export function useGCalendarAPI(): [CalendarEvent[], (date: Date) => void] {
  const [gcalEvents, setGcalEvents] = useState<CalendarEvent[]>([]);
  const [renderedEvents, setRenderedEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    loadGAPI(
      process.env.GATSBY_REACT_APP_GCAL_API_KEY ||
        'AIzaSyCBklATFMNjWUjJVZswlTmoyZh27FbaHDQ'
    )
      .then(() => {
        getEvents(config.nodeGcalId).then((events: GCalResponse) => {
          const processedEvents = processEvents(
            events.result.items,
            events.result.summary
          );
          setGcalEvents(processedEvents);
          const initiallyRenderedEvents = getRenderedEvents(
            processedEvents,
            moment().startOf('month').utc(true)
          );
          setRenderedEvents(initiallyRenderedEvents);
        });
      })
      .catch((err: unknown) => {
        // TODO: Need to show some kind of message to user
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }, []);

  const updateRenderedEvents = (date: Date) => {
    const newRenderedEvents = getRenderedEvents(
      gcalEvents,
      moment(date).startOf('month').utc(true)
    );
    setRenderedEvents(newRenderedEvents);
  };

  return [renderedEvents, updateRenderedEvents];
}
