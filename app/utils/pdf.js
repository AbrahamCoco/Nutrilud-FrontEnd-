import jsPDF from "jspdf";
import "jspdf-autotable";

export function downloadPDF() {
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
  doc.text(
    `Fecha del recordatorio: ${fecha.getDate()}/${
      fecha.getMonth() + 1
    }/${fecha.getFullYear()}       Edad: ${edad} años`,
    40,
    90
  );

  const table = tempDiv.querySelector("table");
  if (table) {
    const headers = Array.from(table.querySelectorAll("th")).map(
      (header) => header.textContent
    );
    const rows = Array.from(table.querySelectorAll("tr"))
      .map((row) =>
        Array.from(row.querySelectorAll("td")).map((cell) => cell.textContent)
      )
      .filter((rowData) => rowData.length > 0);

    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 110,
      theme: "grid",
      styles: { fontSize: 10 },
    });
  }

  const pdfBlob = doc.output("blob");
  const fileName = `Recordatorio_${nombre}${primer_apellido}${segundo_apellido}_${fecha.getDate()}_${
    fecha.getMonth() + 1
  }_${fecha.getFullYear()}_${fecha
    .getHours()
    .toString()
    .padStart(2, "0")}_${fecha.getMinutes().toString().padStart(2, "0")}_${fecha
    .getSeconds()
    .toString()
    .padStart(2, "0")}.pdf`;
  const pdfFile = new File([pdfBlob], fileName, { type: "application/pdf" });

  const formData1 = new FormData();

  formData1.append("nombre", nombre);
  formData1.append("apellido", primer_apellido);
  formData1.append("id", id_paciente);
  formData1.append("file", pdfFile);
}
