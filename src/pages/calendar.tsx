import React, { useEffect, useState, SyntheticEvent } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { usePopper } from 'react-popper';
import Layout from '../components/Layout';
import {
  loadCalendarAPI,
  getEventsList,
  processEvents,
  getRenderedEvents,
} from '../util/googleCalendarAPI';

import '../styles/calendar.scss';
import { CalendarEvent, GCalResponse } from '../types';

const localizer = momentLocalizer(moment);

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

  const otherStyles = {
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

  const handleDocumentClick = (event: MouseEvent) => {
    if (referenceElement && referenceElement?.contains(event.target as Node)) {
      return;
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

  useEffect(() => {
    loadCalendarAPI('AIzaSyCBklATFMNjWUjJVZswlTmoyZh27FbaHDQ')
      .then(() => {
        getEventsList(
          'nodejs.org_nr77ama8p7d7f9ajrpnu506c98@group.calendar.google.com'
        ).then((events: GCalResponse) => {
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
        onView={view => console.log(`onView: ${view}`)}
        views={['month']}
        popup
      />
      {referenceElement && (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <div
          role="tooltip"
          ref={setPopperElement}
          style={{ ...styles.popper, ...otherStyles }}
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
            role="button"
            tabIndex={0}
            onMouseDown={e => {
              const eNode = e.target as Node;
              if (eNode.nodeName === 'A') {
                e.preventDefault();
              }
            }}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: selectedEvent?.description as string,
            }}
          />
          <div>HTMLLINK: {selectedEvent?.htmlLink}</div>
          <br />
          <div>Location: {selectedEvent?.location}</div>
        </div>
      )}
    </Layout>
  );
}
