"use client";
import { Editor } from "@tinymce/tinymce-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaEye } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { RecordatorioController } from "./recordatorioController";

export default function Recordatorios() {
  const searchParams = useSearchParams();
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [recordatorios, setRecordatorios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [id_nutriologo, setIdNutriologo] = useState("");
  const id_paciente = searchParams.get("id_paciente");
  const nombre = searchParams.get("nombre");
  const primer_apellido = searchParams.get("primer_apellido");
  const segundo_apellido = searchParams.get("segundo_apellido");
  const fecha_nacimiento = searchParams.get("fecha_nacimiento");

  const handleSavePDF = async () => {
    if (editorRef.current) {
      const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const contentHTML = editorRef.current.getContent();
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = contentHTML;

      doc.setFontSize(20);
      doc.text("Recordatorio de 24 horas", 40, 50);

      doc.setFontSize(12);
      const nombrePaciente = `${nombre} ${primer_apellido} ${segundo_apellido}`;
      doc.text(`Nombre del paciente: ${nombrePaciente}`, 40, 70);
      const fecha = new Date();
      const edad = fecha.getFullYear() - new Date(fecha_nacimiento).getFullYear();
      doc.text(`Fecha del recordatorio: ${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}       Edad: ${edad} años`, 40, 90);

      const table = tempDiv.querySelector("table");
      if (table) {
        const headers = Array.from(table.querySelectorAll("th")).map((header) => header.textContent);
        const rows = Array.from(table.querySelectorAll("tr"))
          .map((row) => Array.from(row.querySelectorAll("td")).map((cell) => cell.textContent))
          .filter((rowData) => rowData.length > 0);

        doc.autoTable({ head: [headers], body: rows, startY: 110, theme: "grid", styles: { fontSize: 10 } });
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

      await RecordatorioController.postRecordatorio(formData);
      getRecordatorios();
    }
  };

  const getRecordatorios = useCallback(async () => {
    try {
      const response = await RecordatorioController.getRecordatorios(id_paciente);
      setRecordatorios(response.data.recordatorio);
    } catch (error) {
      setRecordatorios([]);
    }
  }, [id_paciente]);

  useEffect(() => {
    const storedId = sessionStorage.getItem("nutriologo_id");
    setIdNutriologo(storedId);
    getRecordatorios();
  }, [getRecordatorios]);

  const columns = [
    {
      name: "No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Nombre/Fecha",
      selector: (row) => (row.created_at ? `Recordatorio de la fecha: ${new Date(row.created_at).toLocaleDateString()} ${new Date(row.created_at).toLocaleTimeString()}` : "Fecha no disponible"),
      sortable: true,
    },
    {
      name: "Ver",
      cell: (row) => (
        <Button variant="primary" onClick={() => handleView(row.recordatorioPdf)}>
          <FaEye />
        </Button>
      ),
    },
  ];

  const handleView = (row) => {
    const url = `http://127.0.0.1:8000${row}`;
    setPdfUrl(url);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPdfUrl("");
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={12}>
            <h1>Recordatorio de 24 hrs</h1>
          </Col>
          <Col md={12} className="py-4">
            <Editor
              apiKey="z2ucrddcmykd18x0265ytd6lhueypl1lr84sa6c4dua7cqk7"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={`
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
                </table>
              `}
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
                toolbar: "undo redo | blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | fontsizeselect",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
              }}
            />
          </Col>
          <Col md={6}>
            <Button variant="primary" onClick={() => window.history.back()}>
              Regresar
            </Button>
          </Col>
          <Col md={6} className="text-right">
            <Button variant="primary" onClick={handleSavePDF}>
              Guardar recordatorio
            </Button>
          </Col>
          <Col md={12} className="py-4">
            <DataTable columns={columns} data={recordatorios} pagination striped highlightOnHover theme="dark" responsive />
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Visualizar PDF</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe src={pdfUrl} width="100%" height="700px" style={{ border: "none" }} title="Visualizar PDF" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
