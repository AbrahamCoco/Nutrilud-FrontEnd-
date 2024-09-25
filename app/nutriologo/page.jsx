"use client";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Clock from "../components/Clock";
import { NutriologoController } from "./nutriologoController";

export default function Nutriologo() {
  const [agenda, setAgenda] = useState(null);

  useEffect(() => {
    loadAgenda();
  }, []);

  const loadAgenda = async () => {
    try {
      const response = await NutriologoController.getAgenda();
      setAgenda(response);
    } catch (error) {
      setAgenda(null);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h1>Dashboard</h1>
          <Row>
            <Col md={6}>
              <Card>
                <Card.Header>Notificaciones</Card.Header>
                <Card.Body>
                  <Card.Title>
                    <div style={{ textAlign: "center" }}>Notificaciones</div>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Header>Fecha y hora</Card.Header>
                <Card.Body>
                  <Card.Title>
                    <div style={{ textAlign: "center" }}>
                      {new Date().toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <Clock />
                    </div>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <FullCalendar
            locale={esLocale}
            plugins={[listPlugin]}
            headerToolbar={{ left: "prev", center: "title", right: "next" }}
            initialView="listWeek"
            events={agenda}
            slotMinTime={"08:00:00"}
            slotMaxTime={"18:00:00"}
            themeSystem="bootstrap4"
            eventDidMount={(info) => {
              if (info.event.extendedProps.status === "done") {
                info.el.style.backgroundColor = "green";
              } else if (info.event.extendedProps.status === "pending") {
                info.el.style.backgroundColor = "red";
              }
            }}
          />
        </Col>
      </Row>
      <Row>Hola Nutriologo</Row>
    </Container>
  );
}
