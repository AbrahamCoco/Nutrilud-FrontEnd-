"use client";
import CalendarMonths from "@/app/components/CalendarMonths";
import Itinerario from "@/app/components/Itinerario";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { NutriologoController } from "./agendaController";

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
