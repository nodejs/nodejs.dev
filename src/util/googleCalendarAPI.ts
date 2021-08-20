import moment, { Moment } from 'moment';
import { rrulestr } from 'rrule';
import {
  CalendarEvent,
  CancelledCalendarEvent,
  ChangedCalendarEvent,
  GCalEvent,
  GCalResponse,
} from '../types';

type InitParam = {
  apiKey: string;
};

interface GAPI {
  load: (path: string, callbackFn: () => void) => Promise<any>;
  client: {
    init: (initParam: InitParam) => Promise<any>;
    load: (path: string) => Promise<any>;
    calendar: {
      events: {
        list: (params: any) => Promise<any>;
      };
    };
  };
}

// let gapi: GAPI;

export async function loadCalendarAPI(apiKey: string): Promise<void> {
  // let gapi: GAPI;
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    document.body.appendChild(script);
    script.onload = () => {
      // eslint-disable-next-line
      // @ts-ignore
      gapi.load('client', () => {
        // eslint-disable-next-line
        // @ts-ignore
        gapi.client.init({ apiKey }).then(() => {
          // eslint-disable-next-line
          // @ts-ignore
          gapi.client
            .load(
              'https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest'
            )
            .then(
              () => resolve(),
              (err: unknown) => reject(err)
            );
        });
      });
    };
  });
}

export async function getEventsList(
  calendarId: string,
  maxResults = 1000
): Promise<GCalResponse> {
  // eslint-disable-next-line
  // @ts-ignore
  return gapi.client.calendar.events.list({
    calendarId,
    maxResults,
  });
}

export function isMultiEvent(startTime: Moment, endTime: Moment): boolean {
  return (
    moment.duration(endTime.diff(startTime)).asHours() >= 24 ||
    (!startTime.isSame(endTime, 'day') && endTime.hour() >= 12)
  );
}

export function processEvents(
  items: GCalEvent[],
  calendarName: string
): CalendarEvent[] {
  // const singleEvents: any = [];
  const events: CalendarEvent[] = [];
  const changed: ChangedCalendarEvent[] = [];
  const cancelled: CancelledCalendarEvent[] = [];

  items.forEach(event => {
    if (event.originalStartTime) {
      // cancelled or changed events
      if (event.status === 'cancelled') {
        // cancelled events
        cancelled.push({
          recurringEventId: event.recurringEventId,
          originalStartTime: event.originalStartTime.dateTime
            ? moment(event.originalStartTime.dateTime)
            : moment.parseZone(event.originalStartTime.date),
        });
      } else if (event.status === 'confirmed') {
        // changed events
        changed.push({
          recurringEventId: event.recurringEventId,
          title: event.summary,
          description: event.description,
          location: event.location,
          originalStartTime: event.originalStartTime.dateTime
            ? moment(event.originalStartTime.dateTime)
            : moment.parseZone(event.originalStartTime.date),
          newStartTime: event.start.dateTime
            ? moment(event.start.dateTime)
            : moment.parseZone(event.start.date),
          newEndTime: event.end.dateTime
            ? moment(event.end.dateTime)
            : moment.parseZone(event.end.date),
        });
      } else {
        console.log('Not categorized: ', event);
      }
    } else if (event.status === 'confirmed') {
      const eventStartTime = event.start.dateTime
        ? moment(event.start.dateTime)
        : moment.parseZone(event.start.date);
      const eventEndTime = event.end.dateTime
        ? moment(event.end.dateTime)
        : moment.parseZone(event.end.date);
      // normal events
      const newEvent: CalendarEvent = {
        id: event.id,
        title: event.summary,
        startTime: eventStartTime,
        endTime: eventEndTime,
        description: event.description,
        location: event.location,
        recurrence: event.recurrence,
        allDay: isMultiEvent(eventStartTime, eventEndTime),
        changedEvents: [],
        cancelledEvents: [],
        calendarName,
      };

      events.push(newEvent);
    } else {
      console.log('Not categorized: ', event);
    }
  });

  // add changed events and cancelled events to corresponding event object
  events.forEach(event => {
    if (event.recurrence) {
      changed
        .filter(change => change.recurringEventId === event.id)
        .forEach(change => {
          event.changedEvents?.push(change);
        });

      cancelled
        .filter(cancel => cancel.recurringEventId === event.id)
        .forEach(cancel => {
          event.cancelledEvents?.push(cancel);
        });
    }
  });

  return events;
}

export function getRRuleDates(
  recurrenceRule: string,
  startTime: Moment,
  betweenStart: Moment,
  betweenEnd: Moment
): Date[] {
  const rstr = `DTSTART:${moment(startTime)
    .utc(true)
    .format('YYYYMMDDTHHmmss')}Z\n${recurrenceRule}`;
  const rruleSet = rrulestr(rstr, { forceset: true });
  const begin = moment(betweenStart).utc(true).toDate();
  const end = moment(betweenEnd).utc(true).toDate();
  const dates = rruleSet.between(begin, end);
  return dates;
}

export function getRenderedEvents(
  events: CalendarEvent[],
  currentMonth: Moment
): CalendarEvent[] {
  const renderedEvents: CalendarEvent[] = [];
  events.forEach(event => {
    if (event.recurrence) {
      const duration = moment.duration(event.endTime.diff(event.startTime));
      const dates = getRRuleDates(
        event.recurrence[0],
        event.startTime,
        moment(currentMonth).subtract(duration),
        moment(currentMonth).add(1, 'month')
      );

      dates.forEach((date: Date) => {
        if (
          event.cancelledEvents?.some(
            (cancelledEvent: CancelledCalendarEvent) =>
              moment(cancelledEvent.originalStartTime).isSame(date, 'day')
          )
        ) {
          return;
        }

        const changedEvent = event.changedEvents?.find(
          (changedMoment: ChangedCalendarEvent) =>
            moment(changedMoment.originalStartTime).isSame(date, 'day')
        );
        if (changedEvent) {
          renderedEvents.push({
            id: changedEvent.recurringEventId,
            title: changedEvent.title,
            startTime: changedEvent.newStartTime,
            endTime: changedEvent.newEndTime,
            description: changedEvent.description,
            location: changedEvent.location,
            calendarName: event.calendarName,
            color: event.color,
          });
        } else {
          const eventStart = moment.utc(date);
          const eventEnd = moment(eventStart).add(duration);
          renderedEvents.push({
            id: event.id,
            title: event.title,
            startTime: eventStart,
            endTime: eventEnd,
            description: event.description,
            location: event.location,
            calendarName: event.calendarName,
            color: event.color,
          });
        }
      });

      renderedEvents.push(event);
    } else {
      renderedEvents.push(event);
    }
  });
  return renderedEvents;
}
