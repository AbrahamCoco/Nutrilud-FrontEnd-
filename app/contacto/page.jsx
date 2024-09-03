"use client";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function Contacto() {
    // Estado para almacenar los valores del formulario
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        mensaje: ""
    });

    // Función para manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar el formulario (por ejemplo, a través de una solicitud HTTP)
        console.log("Formulario enviado:", formData);
    };

    return (
        <Container className="py-3">
            <Row>
                <Col md={6}>
                    <h1>Contacto</h1>
                    <p>¡Gracias por visitarnos! Estamos aquí para ayudarte. Por favor, no dudes en contactarnos si tienes alguna pregunta, comentario o solicitud.</p>
                    <p>Horario de atención: Lunes a Viernes de 9:00 A.M. a 5:00 P.M.</p>
                    <p><strong>Información de contacto:</strong></p>
                    <ul>
                        <li>Teléfono: 246 265 3921</li>
                        <li>Email: info@nutrilud.com</li>
                    </ul>
                </Col>
                <Col md={6}>
                    <div className="p-4 rounded bg-info">
                        <p>No dudes en llenar el siguiente formulario para contactarnos:</p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formNombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Ingresa tu nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Ingresa tu email" name="email" value={formData.email} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formMensaje">
                                <Form.Label>Mensaje</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Escribe tu mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Enviar
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}