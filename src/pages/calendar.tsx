import React, { useEffect, useState, SyntheticEvent } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { usePopper } from 'react-popper';
import dompurify from 'dompurify';
import Layout from '../components/Layout';
import {
  loadCalendarAPI,
  getEventsList,
  processEvents,
  getRenderedEvents,
  getCalendarURL,
} from '../util/googleCalendarAPI';
import { CalendarEvent, GCalResponse } from '../types';
import config from '../config.json';
import '../styles/calendar.scss';

const localizer = momentLocalizer(moment);

const eventCardStyles = {
  backgroundColor: '#333',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '6px',
  fontSize: '13px',
  width: '36rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  zIndex: 999,
};

export default function NodeCalendarPage(): JSX.Element {
  const [gcalEvents, setGcalEvents] = useState<CalendarEvent[]>([]);
  const [renderedEvents, setRenderedEvents] = useState<CalendarEvent[]>([]);
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

  // TODO: Create custom hook for this logic
  useEffect(() => {
    loadCalendarAPI(
      process.env.GATSBY_REACT_APP_GCAL_API_KEY ||
        'AIzaSyCBklATFMNjWUjJVZswlTmoyZh27FbaHDQ'
    )
      .then(() => {
        getEventsList(config.nodeGcalId).then((events: GCalResponse) => {
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
        console.error(err);
      });
  }, []);

  const onNavigate = (navigatedDate: Date): void => {
    const newRenderedEvents = getRenderedEvents(
      gcalEvents,
      moment(navigatedDate).startOf('month').utc(true)
    );
    setRenderedEvents(newRenderedEvents);
  };

  const onSelectEvent = (
    calendarEvent: CalendarEvent,
    event: SyntheticEvent<HTMLElement, Event>
  ) => {
    setReferenceElement(event.target as HTMLElement);
    setSelectedEvent(calendarEvent);
  };

  const startAccessor = (event: CalendarEvent): Date => {
    return event.startTime.toDate();
  };

  const endAccessor = (event: CalendarEvent): Date => {
    return event.endTime.toDate();
  };

  const onView = () => {
    setReferenceElement(null);
  };

  return (
    <Layout title="Node.js Calendar" description="Node.js upcoming events">
      <Calendar
        localizer={localizer}
        events={renderedEvents}
        style={{ height: '90vh' }}
        onSelectEvent={onSelectEvent}
        startAccessor={startAccessor}
        endAccessor={endAccessor}
        onNavigate={onNavigate}
        onView={onView}
        views={['month']}
        popup
      />
      {referenceElement && (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <div
          role="tooltip"
          ref={setPopperElement}
          style={{ ...styles.popper, ...eventCardStyles }}
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
