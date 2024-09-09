"use client";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
// import "react-big-calendar/lib/css/react-big-calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import axiosInstance from "@/app/utils/axiosConfig";
import { Utils } from "@/app/utils/utils";

export default function Agenda() {
  const [agenda, setAgenda] = useState(null);

  useEffect(() => {
    loadAgenda();
  }, []);

  const loadAgenda = async () => {
    try {
      const response = await axiosInstance.get("/nutriologo/agenda");
      const eventos = response.data.agenda.map((evento) => {
        const fechaInicio = new Date(evento.siguiente_consulta);
        const fechaFin = new Date(fechaInicio);
        fechaFin.setMinutes(fechaFin.getMinutes() + 29);

        return {
          title: `Cita con el paciente: ${evento.consulta.user.nombre} ${evento.consulta.user.primer_apellido} ${evento.consulta.user.segundo_apellido}`,
          start: fechaInicio,
          end: fechaFin,
        };
      });
      setAgenda(eventos);
      Utils.swalSuccess("Agenda cargada correctamente");
    } catch (error) {
      Utils.swalFailure("Error al cargar la agenda", error.response.data.message);
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
          <FullCalendar locale={esLocale} plugins={[dayGridPlugin, timeGridPlugin, listPlugin]} headerToolbar={{ left: "", center: "title", right: "" }} initialView="listWeek" events={agenda} slotMinTime={"08:00:00"} slotMaxTime={"18:00:00"} themeSystem="bootstrap4" />
        </div>
      </div>
    </Container>
  );
}
