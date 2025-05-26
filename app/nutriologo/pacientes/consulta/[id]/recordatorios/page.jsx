"use client";
import Table from "@/app/components/Table";
import { Editor } from "@tinymce/tinymce-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaDownload, FaEye, FaArrowLeft } from "react-icons/fa";
import { RecordatorioController } from "./recordatorioController";
import { Tarjet } from "@/app/utils/axiosConfig";

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

      const formData1 = new FormData();

      formData1.append("nombre", nombre);
      formData1.append("apellido", primer_apellido);
      formData1.append("id", id_paciente);
      formData1.append("file", pdfFile);

      const response = await RecordatorioController.postPdfRecordatorio(formData1);
      if (response) {
        const recordatorio = {
          paciente_id: id_paciente,
          nutriologo_id: id_nutriologo,
          recordatorio_pdf: response.data.data,
        };
        await RecordatorioController.postRecordatorio(recordatorio);
        getRecordatorios();
      } else {
        console.log("Error al subir el PDF");
      }
    }
  };

  const getRecordatorios = useCallback(async () => {
    try {
      const response = await RecordatorioController.getRecordatorios(id_paciente);
      setRecordatorios(response.data.data);
    } catch (error) {
      setRecordatorios([]);
    }
  }, [id_paciente]);

  useEffect(() => {
    const storedId = sessionStorage.getItem("id_nutriologo");
    setIdNutriologo(storedId);
    getRecordatorios();
  }, [getRecordatorios]);

  const columns = [
    {
      name: "No.",
      selector: (row) => row.id,
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
        <button onClick={() => handleView(row.recordatorio_pdf)} className="p-2 text-blue-600 hover:text-blue-800 transition-colors">
          <FaEye className="text-xl" />
        </button>
      ),
    },
    {
      name: "Descargar",
      cell: (row) => (
        <button onClick={() => handleDownload(row.recordatorio_pdf)} className="p-2 text-green-600 hover:text-green-800 transition-colors">
          <FaDownload className="text-xl" />
        </button>
      ),
    },
  ];

  const handleView = (row) => {
    const url = `${Tarjet.view}${row.replace(/\\/g, "/")}`;
    setPdfUrl(url);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPdfUrl("");
  };

  const handleDownload = (row) => {
    const url = `${Tarjet.pdf}${row.replace(/\\/g, "/")}`;
    window.open(url, "_blank");
  };

  return (
    <div className="mx-auto">
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity" onClick={handleCloseModal}></div>

          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full relative max-h-[90vh] flex-col">
              <div className="bg-green-600 px-4 py-3 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Visualizar PDF</h3>
                <button onClick={handleCloseModal} className="text-white hover:text-gray-200">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex-grow overflow-hidden">
                <iframe src={pdfUrl} className="w-full h-full border-none" title="Visualizar PDF" />
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleCloseModal}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Recordatorio de 24 hrs</h1>

        <div className="mb-8">
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
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          <button onClick={() => window.history.back()} className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
            <FaArrowLeft />
            Regresar
          </button>
          <button
            onClick={handleSavePDF}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Guardar recordatorio
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Table columns={columns} data={recordatorios} nameTable={"Historial de recordatorios"} />
        </div>
      </div>
    </div>
  );
}
