import Link from "next/link";
import { Dropdown } from "react-bootstrap";

export default function MenuPaciente() {
  return (
    <>
      <Dropdown.Item as={Link} href="/paciente">
        Dashboard
      </Dropdown.Item>
      <Dropdown.Divider />
    </>
  );
}
