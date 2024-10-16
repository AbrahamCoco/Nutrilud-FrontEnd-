"use client";
import { Editor } from "@tinymce/tinymce-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaEye, FaFileDownload } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { RecordatorioController } from "./recordatorioController";

export default function Recordatorios() {
  const searchParams = useSearchParams();
  const editorRef = useRef(null);
  const [content, setContent] = useState("");

  const id_nutriologo = sessionStorage.getItem("nutriologo_id");
  const id_paciente = searchParams.get("id_paciente");
  const nombre = searchParams.get("nombre");
  const primer_apellido = searchParams.get("primer_apellido");
  const segundo_apellido = searchParams.get("segundo_apellido");
  const fecha_nacimiento = searchParams.get("fecha_nacimiento");

  const handleSavePDF = async () => {
    if (editorRef.current) {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const contentHTML = editorRef.current.getContent();
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = contentHTML;

      doc.setFontSize(20);
      doc.text("Recordatorio de 24 horas", 40, 50);

      doc.setFontSize(12);
      const nombrePaciente = `${nombre} ${primer_apellido} ${segundo_apellido}`;
      doc.text(`Nombre del paciente: ${nombrePaciente}`, 40, 70);
      const fecha = new Date();
      doc.text(`Fecha: ${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}           Edad: ${fecha_nacimiento}`, 40, 90);

      const table = tempDiv.querySelector("table");
      if (table) {
        const rows = [];
        const headers = [];

        const headerCells = table.querySelectorAll("th");
        headerCells.forEach((header) => headers.push(header.textContent));

        const rowCells = table.querySelectorAll("tr");
        rowCells.forEach((row) => {
          const rowData = [];
          row.querySelectorAll("td").forEach((cell) => rowData.push(cell.textContent));
          if (rowData.length > 0) rows.push(rowData);
        });

        doc.autoTable({
          head: [headers],
          body: rows,
          startY: 110,
          theme: "grid",
          styles: { fontSize: 10 },
        });
      }

      const pdfBlob = doc.output("blob");

      const fileName = `Recordatorio_${nombre}${primer_apellido}${segundo_apellido}_${fecha.getDate()}_${fecha.getMonth() + 1}_${fecha.getFullYear()}_${fecha
        .getHours()
        .toString()
        .padStart(2, "0")}_${fecha.getMinutes().toString().padStart(2, "0")}_${fecha.getSeconds().toString().padStart(2, "0")}.pdf`;

      const pdfFile = new File([pdfBlob], fileName, { type: "application/pdf" });

      const formData = new FormData();
      formData.append("nutriologo_id", id_nutriologo);
      formData.append("paciente_id", id_paciente);
      formData.append("recordatorioPdf", pdfFile);

      console.log(formData);
      const response = await RecordatorioController.postRecordatorio(formData);
    }
  };

  const columns = [
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
      name: "Ver",
      cell: (row) => (
        <Button variant="primary">
          <FaEye />
        </Button>
      ),
    },
    {
      name: "Descargar",
      cell: (row) => (
        <Button variant="danger">
          <FaFileDownload />
        </Button>
      ),
    },
  ];

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1>Recordatorio de 24 hrs</h1>
        </Col>
        <Col md={12} className="py-4">
          <Editor
            apiKey="z2ucrddcmykd18x0265ytd6lhueypl1lr84sa6c4dua7cqk7"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="
            <table border='1'>
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
            </table>"
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
              toolbar: "undo redo | blocks | bold italic backcolor | " + "alignleft aligncenter alignright alignjustify | " + "bullist numlist outdent indent | removeformat | help | fontsizeselect",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
            }}></Editor>
        </Col>
        <Col md={12}>
          <Button variant="primary" onClick={handleSavePDF}>
            Guardar recordatorio
          </Button>
        </Col>
        <Col md={12} className="py-4">
          <DataTable columns={columns} pagination striped highlightOnHover theme="dark" />
        </Col>
      </Row>
    </Container>
  );
}
