import { useState, useMemo } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  DateLocalizer,
  Views,
} from "react-big-calendar";
import DateTimePicker from "react-datetime-picker";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import enUS from "date-fns/locale/en-US";
import InfoModal from "../Layout/InfoModal";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import ConfirmModal from "../Layout/ConfirmModal";
import InputModal from "../Layout/InputModal";
import { Button, Form } from "react-bootstrap";

interface Event {
  title: string;
  start: Date;
  end: Date;
  id: string;
}

const BigCalendar: React.FC = () => {
  // LOCALE
  const locales = useMemo(
    () => ({
      "en-US": enUS,
    }),
    []
  );

  const localizer = useMemo<DateLocalizer>(
    () =>
      dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
      }),
    [locales]
  );

  // DELETE EVENT
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

  const onDeleteEvent = (event: Event) => {
    setEventToDelete(event);
    setShowConfirmModal(true);
  };

  const handleDeleteEventConfirm = () => {
    if (eventToDelete) {
      const newEvents = events.filter((e) => e.id !== eventToDelete.id);
      setEvents(newEvents);
      localStorage.setItem("events", JSON.stringify(newEvents));
      setShowConfirmModal(false);
    }
  };

  const handleConfirmModalClose = () => {
    setShowConfirmModal(false);
  };

  // SELECT AND SAVE EVENT
  const [showInputModal, setShowInputModal] = useState(false);
  const [start, setStart] = useState<Date>();
  const [end, setEnd] = useState<Date>();

  const handleSelect = ({
    start: selectedStart,
    end: selectedEnd,
  }: {
    start: Date;
    end: Date;
  }) => {
    setStart(selectedStart);
    setEnd(selectedEnd);
    setShowInputModal(true);
  };

  const handleSaveEvent = (title: string) => {
    if (start && end && title) {
      const newEvent: Event = {
        start: start,
        end: end,
        title: title,
        id: Math.round(Math.random() * 1000000).toString(),
      };
      setEvents([newEvent, ...events]);
      localStorage.setItem("events", JSON.stringify([newEvent, ...events]));
    }
    setShowInputModal(false);
  };

  // VALIDATION
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [infoModalMessage, setInfoModalMessage] = useState<string>("");

  const showInfoModalWithMessage = (message: string) => {
    setInfoModalMessage(message);
    setShowInfoModal(true);
  };

  const handleInfoModalClose = () => {
    setShowInfoModal(false);
  };

  // ADD EVENT
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: new Date(),
    end: new Date(),
    id: "",
  });
  const [events, setEvents] = useState<Event[]>(() => {
    const storedEvents = localStorage.getItem("events");
    const parsedEvents = storedEvents ? JSON.parse(storedEvents) : [];
    return parsedEvents.map((event: Event) => {
      const parsedEvent = { ...event };
      parsedEvent.start = new Date(parsedEvent.start);
      parsedEvent.end = new Date(parsedEvent.end);
      return parsedEvent;
    });
  });

  const [titleIsEmpty, setTitleIsEmpty] = useState<boolean>(true);
  const [startIsDate, setStartIsDate] = useState<boolean>(false);
  const [endIsDate, setEndIsDate] = useState<boolean>(false);

  const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== "" || e.target.value.length !== 0) {
      setTitleIsEmpty(false);
    }
    setNewEvent((prevState) => ({ ...prevState, title: e.target.value }));
  };

  const setStartDate = (start: Date) => {
    if (start instanceof Date) {
      setStartIsDate(true);
    }
    setNewEvent((prevState) => ({ ...prevState, start }));
  };

  const setEndDate = (end: Date) => {
    if (end instanceof Date) {
      setEndIsDate(true);
    }
    setNewEvent((prevState) => ({ ...prevState, end }));
  };

  const addEventHandler = () => {
    newEvent.id = Math.round(Math.random() * 1000000).toString();

    if (newEvent.title.trim() === "" || newEvent.title.length === 0) {
      showInfoModalWithMessage(
        "Name cannot be empty. Please enter a valid name."
      );
      return;
    }

    if (!newEvent.start || !newEvent.end) {
      showInfoModalWithMessage(
        "Dates cannot be empty. Please enter valid dates."
      );
      return;
    }

    if (newEvent.start.getTime() > newEvent.end.getTime()) {
      showInfoModalWithMessage("The start date must be before the end date.");
      return;
    }

    if (!titleIsEmpty && startIsDate && endIsDate) {
      setEvents([newEvent, ...events]);
      localStorage.setItem("events", JSON.stringify([newEvent, ...events]));
    }

    setNewEvent({
      title: "",
      start: new Date(),
      end: new Date(),
      id: "",
    });
  };

  return (
    <>
      <div
        className="mb-5 d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1580637250481-b78db3e6f84b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="my-5">CALENDAR</h1>

        <Form>
          <Form.Group className="mb-3" style={{ width: "325px" }}>
            <Form.Label>Event's title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={newEvent.title}
              onChange={setTitle}
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{ width: "325px" }}>
            <Form.Label>Event's start date</Form.Label>
            <DateTimePicker
              yearPlaceholder="yyyy"
              monthPlaceholder="mm"
              dayPlaceholder="dd"
              hourPlaceholder="hh"
              minutePlaceholder="mm"
              value={newEvent.start}
              onChange={setStartDate}
              className="form-control"
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{ width: "325px" }}>
            <Form.Label>Event's end date</Form.Label>
            <DateTimePicker
              yearPlaceholder="yyyy"
              monthPlaceholder="mm"
              dayPlaceholder="dd"
              hourPlaceholder="hh"
              minutePlaceholder="mm"
              value={newEvent.end}
              onChange={setEndDate}
              className="form-control"
            />
          </Form.Group>

          <Button
            variant="dark"
            onClick={addEventHandler}
            style={{ width: "325px" }}
          >
            ADD NEW EVENT
          </Button>
        </Form>

        <p style={{ maxWidth: "450px", margin: "40px 10px" }}>
          To create an event, use the form below or click the space on the
          calendar and drag your mouse down to select the time.
        </p>
      </div>

      <Calendar
        selectable
        localizer={localizer}
        events={events}
        defaultView={Views.MONTH}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        onSelectEvent={onDeleteEvent}
        onSelectSlot={handleSelect}
      />

      <InfoModal
        show={showInfoModal}
        message={infoModalMessage}
        handleClose={handleInfoModalClose}
      />
      <ConfirmModal
        show={showConfirmModal}
        title="Delete Event"
        message="Would you like to delete this event?"
        onConfirm={handleDeleteEventConfirm}
        onHide={handleConfirmModalClose}
      />
      <InputModal
        show={showInputModal}
        handleClose={() => setShowInputModal(false)}
        handleSave={handleSaveEvent}
      />
    </>
  );
};
export default BigCalendar;
