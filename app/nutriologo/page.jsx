"use client";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Clock from "../components/Clock";
import Itinerario from "../components/Itinerario";
import { NutriologoController } from "./agenda/agendaController";

export default function Nutriologo() {
  const [eventos, setEventos] = useState(null);

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
        <Col md={12}>
          <h1>Dashboard</h1>
          <Row>
            <Col md={4}>{renderCard("Notificaciones", "Notificaciones")}</Col>
            <Col md={4}>
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
            <Col md={4}>{eventos ? <Itinerario eventos={eventos} /> : renderCard("Itinerario", "No hay eventos")}</Col>
          </Row>
        </Col>
      </Row>
      <Row>Hola Nutriologo</Row>
    </Container>
  );
}
