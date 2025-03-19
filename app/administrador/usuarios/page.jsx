import { Button, Col, Container, Row } from "react-bootstrap";
import { UsersController } from "./usersController";
import { FaEdit, FaTrash } from "react-icons/fa";

export default async function ListaUsuarios() {
  const { users } = await UsersController.getAllUsers();
  const data = users.data;

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1>Lista de usuarios</h1>
          {data.length === 0 ? (
            <p>No hay usuarios disponibles.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr key={user.id}>
                    <td>
                      {user.nombre} {user.primer_apellido} {user.segundo_apellido}
                    </td>
                    <td>{user.correo}</td>
                    <td>{user.trols?.rol || "Sin rol"}</td>
                    <td>
                      <Button variant="warning">
                        <FaEdit />
                      </Button>
                    </td>
                    <td>
                      <Button variant="danger">
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Col>
      </Row>
    </Container>
  );
}
