"use client";
import { Editor } from "@tinymce/tinymce-react";
import jsPDF from "jspdf";
import { useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Recordatorios() {
  const editorRef = useRef(null);
  const [content, setContent] = useState("");

  const handleSavePDF = () => {
    if (editorRef.current) {
      const doc = new jsPDF();
      doc.text(editorRef.current.getContent({ format: "text" }), 10, 10);
      doc.save("recordatorio.pdf");
    }
  };

  const colums = [
    {
      name: "Nombre",
      selector: "nombre",
      sortable: true,
    },
    {
      name: "Fecha",
      selector: "fecha",
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <Button variant="primary">
            <FaEdit />
          </Button>
          <Button variant="danger">
            <FaTrash />
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1>Recordatorio de 24 horas</h1>
        </Col>
        <Col md={12}>
          <Editor
            apiKey="z2ucrddcmykd18x0265ytd6lhueypl1lr84sa6c4dua7cqk7"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<h2>Recordatorio de 24 horas</h2>
            <Table>
              <tr>
                <th></th>
                <th>Hora</th>
                <th>Lugar</th>
                <th>Alimentos</th> 
                <th>Porciones</th> 
                <th>Marca</th> 
                <th>Formas de preparacion</th>
              </tr>
              <tr>
                <td>Desayuno</td>
                <td></td>
                <td></td> 
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Almuerzo</td>
                <td></td>
                <td></td> 
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Media tarde</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Cena</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Colacion</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Otros</td>
                <td></td>
              </tr>
            </Table>"
            onEditorChange={(content) => setContent(content)}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar: "undo redo | blocks | bold italic backcolor | " + "alignleft aligncenter alignright alignjustify | " + "bullist numlist outdent indent | removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
            }}></Editor>
        </Col>
        <Col md={12} className="py-2">
          <Button variant="primary" onClick={handleSavePDF}>
            Guardar recordatorio
          </Button>
        </Col>
        <Col md={12} className="py-2">
          <DataTable columns={colums} pagination striped highlightOnHover theme="dark" />
        </Col>
      </Row>
    </Container>
  );
}
