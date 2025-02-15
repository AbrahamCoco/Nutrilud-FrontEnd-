"use client";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import { NutriologoController } from "./agendaController";
import CalendarMonths from "@/app/components/CalendarMonths";
import Itinerario from "@/app/components/Itinerario";

export default function Agenda() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const loadAgenda = async () => {
      try {
        const response = await NutriologoController.getAgenda(sessionStorage.getItem("id_nutriologo"));

        setEventos(response);
      } catch (error) {
        setEventos(null);
      }
    };
    loadAgenda();
  }, []);

  return (
    <Container>
      <h1>Calendario - Agenda</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="mb-4">
            <CalendarMonths eventos={eventos} />
          </div>
        </div>
        <div className="col-md-4">
          <Itinerario eventos={eventos} />
        </div>
      </div>
    </Container>
  );
}
