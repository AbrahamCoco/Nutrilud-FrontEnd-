"use client";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import { AgendaController } from "./agendaController";

export default function Agenda() {
  const [agenda, setAgenda] = useState(null);

  useEffect(() => {
    loadAgenda();
  }, []);

  const loadAgenda = async () => {
    try {
      const response = await AgendaController.getAgenda();

      setAgenda(response);
    } catch (error) {
      setAgenda([]);
    }
  };

  return (
    <Container>
      <h1>Calendario - Agenda</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="mb-4">
            <FullCalendar
              locale={esLocale}
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              initialView="dayGridMonth"
              events={agenda}
              slotMinTime={"08:00:00"}
              slotMaxTime={"18:00:00"}
              themeSystem="standard"
            />
          </div>
        </div>
        <div className="col-md-4">
          <FullCalendar
            locale={esLocale}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            headerToolbar={{ left: "", center: "title", right: "" }}
            initialView="listWeek"
            events={agenda}
            slotMinTime={"08:00:00"}
            slotMaxTime={"18:00:00"}
            themeSystem="bootstrap4"
          />
        </div>
      </div>
    </Container>
  );
}
