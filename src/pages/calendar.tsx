import React, { useEffect, useState, SyntheticEvent } from 'react';
import moment from 'moment';
import dompurify from 'dompurify';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { usePopper } from 'react-popper';
import Layout from '../components/Layout';
import { getCalendarURL } from '../util/gcalUtils';
import { CalendarEvent } from '../types';
import { useGCalendarAPI } from '../hooks/useGCalAPI';
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
  const [events, setEvents] = useGCalendarAPI();
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
        events={events}
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
