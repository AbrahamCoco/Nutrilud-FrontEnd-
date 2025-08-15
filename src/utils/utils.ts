import jsPDF from "jspdf";
import autoTable, { FontStyle } from "jspdf-autotable";
import Swal from "sweetalert2";

export class Utils {
  static swalFaileru(title: string, message: string) {
    Swal.fire({
      position: "bottom-end",
      toast: true,
      showConfirmButton: false,
      icon: "warning",
      width: 300,
      title,
      text: message,
      timer: 3000,
      timerProgressBar: true,
    })
  }

  static swalError(message: string) {
    Swal.fire({
      position: "bottom-end",
      toast: true,
      showConfirmButton: false,
      icon: "error",
      width: 300,
      title: "Ooops...",
      text: message,
      timer: 3000,
      timerProgressBar: true,
    })
  }

  static swalSuccess(message: string) {
    Swal.fire({
      position: "bottom-end",
      toast: true,
      showConfirmButton: false,
      icon: "success",
      width: 300,
      title: "Exito...!",
      text: message,
      timer: 3000,
      timerProgressBar: true,
    })
  }

  static swalWarning(message: string) {
    Swal.fire({
      position: "bottom-end",
      toast: true,
      showConfirmButton: false,
      icon: "warning",
      width: 300,
      title: "Atencion...!",
      text: message,
      timer: 3000,
      timerProgressBar: true,
    })
  }

  static swalInfo(message: string) {
    Swal.fire({
      position: "bottom-end",
      toast: true,
      showConfirmButton: false,
      icon: "info",
      width: 300,
      title: "Informacion...!",
      text: message,
      timer: 3000,
      timerProgressBar: true,
    })
  }

  static downloadPDF(data: any): void {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4"
    });

    // Configuración inicial
    const primaryColor = [41, 128, 185]; // Azul profesional
    const secondaryColor = [52, 152, 219]; // Azul claro
    const grayColor = [100, 100, 100];
    const lightGray = [240, 240, 240];
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;

    // Logo (opcional)
    // Si tienes un logo en base64, puedes agregarlo así:
    // doc.addImage(logoData, 'PNG', margin, 20, 50, 50);

    // Encabezado
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth, 80, 'F');
    
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("RECORDATORIO DE 24 HORAS", pageWidth / 2, 50, { align: "center" });

    // Información del paciente
    doc.setFontSize(12);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.setFont("helvetica", "normal");
    
    const nombrePaciente = `${data.tusuario_paciente.nombre} ${data.tusuario_paciente.primer_apellido} ${data.tusuario_paciente.segundo_apellido}`;
    const fecha = new Date();
    const edad = fecha.getFullYear() - new Date(data.tusuario_paciente.tusuario_pacientes.fecha_nacimiento).getFullYear();
    const fechaFormateada = fecha.toLocaleDateString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Tarjeta de información del paciente
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.roundedRect(margin, 100, pageWidth - 2 * margin, 60, 3, 3, 'F');
    
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.setFont("helvetica", "bold");
    doc.text("Información del Paciente", margin + 15, 120);
    
    doc.setFont("helvetica", "normal");
    doc.text(`Nombre: ${nombrePaciente}`, margin + 15, 140);
    doc.text(`Edad: ${edad} años`, margin + 300, 140);
    doc.text(`Fecha: ${fechaFormateada}`, margin + 15, 160);

    // Tabla de alimentos
    const headers = [
        [
            { 
                content: "Comida",
                styles: { 
                    fillColor: secondaryColor as [number, number, number],
                    textColor: 255,
                    fontStyle: "bold" as FontStyle
                }
            },
            { 
                content: "Hora",
                styles: { 
                    fillColor: secondaryColor as [number, number, number],
                    textColor: 255,
                    fontStyle: "bold" as FontStyle
                }
            },
            { 
                content: "Alimentos",
                styles: { 
                    fillColor: secondaryColor as [number, number, number],
                    textColor: 255,
                    fontStyle: "bold" as FontStyle
                }
            },
            { 
                content: "Porciones",
                styles: { 
                    fillColor: secondaryColor as [number, number, number],
                    textColor: 255,
                    fontStyle: "bold" as FontStyle
                }
            },
            { 
                content: "Marca",
                styles: { 
                    fillColor: secondaryColor as [number, number, number],
                    textColor: 255,
                    fontStyle: "bold" as FontStyle
                }
            },
            { 
                content: "Preparación",
                styles: { 
                    fillColor: secondaryColor as [number, number, number],
                    textColor: 255,
                    fontStyle: "bold" as FontStyle
                }
            }
        ]
    ];

    const rows = data.tdata_recordatorio.map((comida: any) => [
        comida.comida || "-",
        (comida.hora ? comida.hora : "No especificada") + " hrs",
        comida.alimentos || "-",
        comida.porciones || "-",
        comida.marca || "-",
        comida.preparacion || "-"
    ]);

    autoTable(doc, {
        head: headers,
        body: rows,
        startY: 180,
        theme: "grid",
        styles: { 
            fontSize: 10,
            cellPadding: 6,
            textColor: [...grayColor] as [number, number, number],
            lineColor: [200, 200, 200],
            lineWidth: 0.5
        },
        headStyles: {
            fillColor: secondaryColor as [number, number, number],
            textColor: 255,
            fontStyle: "bold" as FontStyle
        },
        alternateRowStyles: {
            fillColor: [248, 248, 248]
        },
        margin: { left: margin, right: margin }
    });

    // Sección de observaciones
    const finalY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 20 : 180;
    
    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont("helvetica", "bold");
    doc.text("OBSERVACIONES NUTRICIONALES", margin, finalY);
    
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(1);
    doc.line(margin, finalY + 5, margin + 150, finalY + 5);
    
    doc.setFontSize(10);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.setFont("helvetica", "normal");
    
    const splitObservaciones = doc.splitTextToSize(data.observaciones || "No hay observaciones registradas", pageWidth - 2 * margin);
    doc.text(splitObservaciones, margin, finalY + 25);

    // Sección de alimentos complementarios
    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont("helvetica", "bold");
    doc.text("ALIMENTOS COMPLEMENTARIOS", margin, finalY + 25 + (splitObservaciones.length * 12) + 20);
    
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.line(margin, finalY + 25 + (splitObservaciones.length * 12) + 25, margin + 180, finalY + 25 + (splitObservaciones.length * 12) + 25);
    
    doc.setFontSize(10);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.setFont("helvetica", "normal");
    
    const splitOtros = doc.splitTextToSize(data.otros || "No hay alimentos complementarios especificados", pageWidth - 2 * margin);
    doc.text(splitOtros, margin, finalY + 25 + (splitObservaciones.length * 12) + 45);

    // Pie de página
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generado el ${fecha.toLocaleString()}`, margin, doc.internal.pageSize.getHeight() - 20);
    doc.text("© NutriLud - Sistema de Nutriología", pageWidth - margin, doc.internal.pageSize.getHeight() - 20, { align: "right" });

    // Nombre del archivo
    const fileName = `Recordatorio_${nombrePaciente.replace(/\s+/g, '_')}_${fecha.getDate()}_${fecha.getMonth() + 1}_${fecha.getFullYear()}_${fecha.getHours().toString().padStart(2, "0")}:${fecha.getMinutes().toString().padStart(2, "0")}:${fecha.getSeconds().toString().padStart(2, "0")}.pdf`;
    doc.save(fileName);
  }
}