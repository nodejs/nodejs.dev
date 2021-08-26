import React, { useEffect, useState, SyntheticEvent } from 'react';
// import moment from 'moment';
import moment from 'moment-timezone';
import dompurify from 'dompurify';
import { Calendar, Formats, momentLocalizer } from 'react-big-calendar';
import { usePopper } from 'react-popper';
import Layout from '../components/Layout';
import { getCalendarURL } from '../util/gcalUtils';
import { CalendarEvent } from '../types';
import { useGCalAPI } from '../hooks/useGCalAPI';
import '../styles/calendar.scss';

// const meow = moment();
// BigCalendar.tz = moment.tz.guess();
// moment.tz.setDefault();
// const localizer = momentLocalizer(moment);
// const currentTimezone = moment.tz.guess();
// const getMoment = (timezone = currentTimezone) => {
//   const m = (...args) => moment.tz(...args, timezone);
//   m.localeData = moment.localeData;
//   return m;
// };

export default function NodeCalendarPage(): JSX.Element {
  const [events, setEvents] = useGCalAPI();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  const handleDocumentClick = (event: MouseEvent) => {
    if (referenceElement && referenceElement?.contains(event.target as Node)) {
      return;
    }

    if (referenceElement?.parentElement?.classList.contains('rbc-selected')) {
      const selectedElements = document.getElementsByClassName('rbc-selected');
      Array.from(selectedElements).forEach(elm => {
        elm.classList.remove('rbc-selected');
      });
    }
    setReferenceElement(null);
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referenceElement]);

  const onNavigate = (navigatedDate: Date): void => {
    setEvents(navigatedDate);
  };

  const onSelectEvent = (
    calendarEvent: CalendarEvent,
    event: SyntheticEvent<HTMLElement, Event>
  ) => {
    setReferenceElement(event.target as HTMLElement);
    setSelectedEvent(calendarEvent);
  };

  const startAccessor = (event: CalendarEvent): Date => {
    // console.log(event.startTime.utcOffset());
    // console.log(
    //   '🚀 -> file: calendar.tsx -> line 128 -> startAccessor -> event.startTime.utcOffset()',
    //   event.startTime.utcOffset()
    // );
    if (
      event.startTime.date() === 26 &&
      event.startTime.year() === 2021 &&
      event.startTime.month() === 7
    ) {
      console.log(
        '🚀 -> file: calendar.tsx -> line 70 -> startAccessor -> event',
        event
      );
      console.log(
        '🚀 -> file: calendar.tsx -> line 70 -> startAccessor -> event offset',
        event.startTime.utc(true).utcOffset()
      );
    }
    return event.startTime.toDate();
    // const date = new Date(event.startTime.toLocaleString());
    // console.log(
    //   '🚀 -> file: calendar.tsx -> line 85 -> startAccessor -> date',
    //   date
    // );

    // return date;
    // return moment.tz(event.startTime.toISOString()).toDate();
  };

  const endAccessor = (event: CalendarEvent): Date => {
    return event.endTime.toDate();
    // return new Date(event.endTime.toLocaleString());
    // return moment.tz(event.endTime.toISOString()).toDate();
  };

  const onView = () => {
    setReferenceElement(null);
  };

  useEffect(() => {
    const augEvents = events?.filter(event => event.startTime.month() === 7);
    console.log(
      '🚀 -> file: calendar.tsx -> line 74 -> NodeCalendarPage -> events',
      augEvents
    );
  }, [events]);

  const formats: Formats = {
    dateFormat: 'dd',
    timeGutterFormat: (date, culture, local) => {
      return moment(date).toLocaleString();
    },
    dayFormat: (date, culture, local) => local!.format(date, 'DDD', culture!),
    // dayRangeHeaderFormat: ({ start, end }, culture, local) =>
    //   `${local!.format(start, '',culture)} - ${local!.format(end, { date: 'short' }, culture)}`,
    eventTimeRangeFormat: (range, culture, local) => {
      console.log(
        '🚀 -> file: calendar.tsx -> line 96 -> NodeCalendarPage -> culture',
        culture
      );
      console.log(
        '🚀 -> file: calendar.tsx -> line 96 -> NodeCalendarPage -> range',
        range
      );
      // return local!.format(
      // console.log(
      //   '🚀 -> file: calendar.tsx -> line 117 -> NodeCalendarPage -> local?.formats',
      //   local?.formats
      // );
      const eventTimeRange = `${moment(range.start.toLocaleString()).format(
        'h:mma'
      )} - ${moment(range.end.toLocaleString()).format('h:mma')}`;
      console.log(
        '🚀 -> file: calendar.tsx -> line 108 -> eventTimeRange -> eventTimeRange',
        eventTimeRange
      );

      return 'foobar';
    },
  };

  // const currentTimezone = moment.tz.guess();
  // const getMoment = (timezone = currentTimezone) => {
  //   // eslint-disable-next-line
  //   // @ts-ignore
  //   const m = (...rest: any[]) => moment.tz(...rest, timezone);
  //   m.localeData = moment.localeData;
  //   return m;
  // };

  const mom = () => {
    moment.tz.setDefault();
    return moment;
  };
  // TODO: I think the root issue has to do with how this localizer is formatting dates
  const localizer = momentLocalizer(mom());

  return (
    <Layout title="Node.js Calendar" description="Node.js upcoming events">
      <Calendar
        localizer={localizer}
        events={events}
        style={{ height: '90vh' }}
        onSelectEvent={onSelectEvent}
        startAccessor={startAccessor}
        endAccessor={endAccessor}
        onNavigate={onNavigate}
        onView={onView}
        // formats={formats}
        // views={['month']}
        popup
      />
      {referenceElement && (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <div
          role="tooltip"
          className="rbc-tooltip"
          ref={setPopperElement}
          style={{ ...styles.popper }}
          onClick={e => e.stopPropagation()}
          onKeyPress={e => e.stopPropagation()}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...attributes.popper}
        >
          <h2>{selectedEvent?.title}</h2>
          <div>
            {selectedEvent?.startTime.format('dddd, MMMM Do')}
            <br />
            {selectedEvent?.startTime.format('h:mma')} -{' '}
            {selectedEvent?.endTime.format('h:mma')}
          </div>
          <br />
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: dompurify.sanitize(selectedEvent?.description as string),
            }}
          />
          <div>
            {selectedEvent?.location &&
            selectedEvent.location.includes('https') ? (
              <a href={selectedEvent.location}>{selectedEvent.location}</a>
            ) : (
              selectedEvent?.location
            )}
          </div>
          <div>
            <a href={getCalendarURL(selectedEvent as CalendarEvent)}>
              Copy to Calendar
            </a>
          </div>
        </div>
      )}
    </Layout>
  );
}
