import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views, View } from 'react-big-calendar';
import { sanitize } from 'isomorphic-dompurify';
import moment from 'moment';
import { usePopper } from 'react-popper';
import Layout from '../../components/Layout';
import { CalendarEvent } from '../../types';
import { useGCalAPI } from '../../hooks/useGCalAPI';

const localizer = momentLocalizer(moment);

const CalendarPage = (): JSX.Element => {
  const [events, setEvents] = useGCalAPI();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [view, setView] = useState<View>(Views.MONTH);
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  const handleDocumentClick = (event?: MouseEvent) => {
    if (referenceElement && referenceElement?.contains(event?.target as Node)) {
      return;
    }

    const selectedElements = document.getElementsByClassName('rbc-selected');
    Array.from(selectedElements).forEach(elm => {
      elm.classList.remove('rbc-selected');
    });
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

  const startAccessor = (event: CalendarEvent): Date =>
    event.startTime.toDate();

  const endAccessor = (event: CalendarEvent): Date => event.endTime.toDate();

  const onView = (navigatedView: View) => {
    setView(navigatedView);
    handleDocumentClick();
    setReferenceElement(null);
  };

  return (
    <Layout title="Node.js Calendar" description="Node.js upcoming events">
      <div className="rbc-calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          onSelectEvent={onSelectEvent}
          startAccessor={startAccessor}
          endAccessor={endAccessor}
          onNavigate={onNavigate}
          onView={onView}
          titleAccessor={(event: CalendarEvent) =>
            `${event.startTime.format('ha')} ${event.title} || '' `
          }
          popup
        />
      </div>
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
              __html: sanitize(selectedEvent?.description as string),
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
        </div>
      )}
    </Layout>
  );
};
export default CalendarPage;
