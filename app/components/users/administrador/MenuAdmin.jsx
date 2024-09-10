import Link from "next/link";
import { Dropdown } from "react-bootstrap";

export default function MenuAdmin() {
  return (
    <>
      <Dropdown.Item as={Link} href="/administrador">
        Dashboard
      </Dropdown.Item>
      <Dropdown.Divider />
    </>
  );
}
