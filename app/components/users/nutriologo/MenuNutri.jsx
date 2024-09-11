import Link from "next/link";
import { Dropdown } from "react-bootstrap";

export default function MenuNutri() {
  return (
    <>
      <Dropdown.Item as={Link} href="/nutriologo">
        Dashboard
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item as={Link} href="/nutriologo/agregar-articulo">
        Agregar articulo
      </Dropdown.Item>
      <Dropdown.Item as={Link} href="/nutriologo/agenda">
        Agenda
      </Dropdown.Item>
      <Dropdown.Item as={Link} href="/nutriologo/pacientes">
        Pacientes
      </Dropdown.Item>
      <Dropdown.Divider />
    </>
  );
}
