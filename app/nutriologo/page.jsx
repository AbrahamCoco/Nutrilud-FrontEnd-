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
    const loadAgenda = async () => {
      try {
        const response = await NutriologoController.getAgenda(sessionStorage.getItem("id_nutriologo"));
        setAgenda(response);
      } catch (error) {
        setAgenda(null);
      }
    };
    loadAgenda();
  }, []);

  const renderCard = (header, body) => (
    <Card>
      <Card.Header>{header}</Card.Header>
      <Card.Body>
        <Card.Title>
          <div style={{ textAlign: "center" }}>{body}</div>
        </Card.Title>
      </Card.Body>
    </Card>
  );

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h1>Dashboard</h1>
          <Row>
            <Col md={6}>{renderCard("Notificaciones", "Notificaciones")}</Col>
            <Col md={6}>
              {renderCard(
                "Fecha y hora",
                <>
                  {new Date().toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  <Clock />
                </>
              )}
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
