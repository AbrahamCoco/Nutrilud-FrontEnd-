"use client";
import { useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSendEmail = () => {
    const adminEmail = "karinetza09@gmail.com";
    const subject = encodeURIComponent(`Consulta de ${nombre}`);
    const body = encodeURIComponent(`Hola, mi nombre es ${nombre}.\n\n${mensaje}`);

    window.location.href = `mailto:${adminEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <Container className="py-3">
      <Row>
        <Col md={6}>
          <h1>Contacto</h1>
          <p>¡Gracias por visitarnos! Estamos aquí para ayudarte. Por favor, no dudes en contactarnos si tienes alguna pregunta, comentario o solicitud.</p>
          <p>Horario de atención: Lunes a Viernes de 9:00 A.M. a 5:00 P.M.</p>
          <p>
            <strong>Información de contacto:</strong>
          </p>
          <ul>
            <li>Teléfono: 246 265 3921</li>
            <li>Email: karinetza09@gmail.com</li>
          </ul>
        </Col>
        <Col md={6}>
          <div className="p-4 rounded bg-info">
            <p>No dudes en llenar el siguiente formulario para contactarnos:</p>
            <FloatingLabel controlId="nombre" label="Nombre" className="mb-3">
              <Form.Control type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel controlId="email" label="Email" className="mb-3">
              <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel controlId="mensaje" label="Mensaje" className="mb-3">
              <Form.Control as="textarea" placeholder="Mensaje" value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
            </FloatingLabel>
            <Button variant="primary" type="submit" onClick={handleSendEmail}>
              Enviar
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
