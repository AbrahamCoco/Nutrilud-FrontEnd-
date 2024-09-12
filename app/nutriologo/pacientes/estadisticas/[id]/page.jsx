"use client";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/app/utils/axiosConfig";
import { Utils } from "@/app/utils/utils";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function EstadisticasPaciente() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`auth/user/${id}`);
        setData(response.data);
        console.log(response.data);
        Utils.swalSuccess("Datos cargados correctamente");
      } catch (error) {
        Utils.swalError("Error al cargar datos del paciente", error.message);
      }
    };

    fetchData();
  }, [id]);

  if (!data) {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h1>Dashboard</h1>
            <h2>Cargando datos...</h2>
          </Col>
        </Row>
      </Container>
    );
  }

  const generateChartData = (label, key, borderColor, backgroundColor) => {
    const consulta = data.data.paciente.consulta || [];

    // Si el array está vacío, devuelve datos por defecto o evita el error
    if (consulta.length === 0) {
      const defaultDate = new Date();
      return {
        labels: [defaultDate.toLocaleDateString("es-ES", { month: "long" })],
        datasets: [
          {
            label: label,
            data: [null],
            borderColor,
            backgroundColor,
          },
        ],
      };
    }

    const labels = consulta.map((c) => {
      const date = new Date(c.fecha_medicion || new Date()); // Maneja la posibilidad de fecha_medicion indefinida
      return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
    });

    const firstDate = new Date(consulta[0].fecha_medicion);
    firstDate.setMonth(firstDate.getMonth() - 1);
    const previousMonth = firstDate.toLocaleDateString("es-ES", { day: "numeric", month: "short" });

    const lastDate = new Date(consulta[consulta.length - 1].fecha_medicion);
    lastDate.setMonth(lastDate.getMonth() + 1);
    const nextMonth = lastDate.toLocaleDateString("es-ES", { day: "numeric", month: "short" });

    const updatedLabels = [previousMonth, ...labels, nextMonth];
    const datasetData = consulta.map((c) => c[key]);
    const updatedDatasetData = [null, ...datasetData, null];

    return {
      labels: updatedLabels,
      datasets: [
        {
          label: label,
          data: updatedDatasetData,
          borderColor,
          backgroundColor,
        },
      ],
    };
  };

  const dataPeso = generateChartData("Peso (Kg)", "peso", "rgba(75, 192, 192, 1)", "rgba(75, 192, 192, 0.1)");
  const dataEstatura = generateChartData("Estatura (m)", "estatura", "rgba(153, 102, 255, 1)", "rgba(153, 102, 255, 0.1)");
  const dataIMC = generateChartData("IMC", "imc", "rgba(255, 159, 64, 1)", "rgba(255, 159, 64, 0.1)");
  const porcentajegrasa = generateChartData("Porcentaje de grasa (%)", "porcentaje_grasa", "rgba(255, 99, 132, 1)", "rgba(255, 99, 132, 0.1)");
  const porcentajeMusculo = generateChartData("Porcentaje de musculo (%)", "porcentaje_musculo", "rgba(54, 162, 235, 1)", "rgba(54, 162, 235, 0.1)");

  return (
    <Container>
      <Row>
        <h1>Estadisticas del paciente</h1>
        <Col md={4}>
          <Card>
            <Card.Header>Grafica de peso</Card.Header>
            <Card.Body>
              <Line data={dataPeso} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Grafica de altura</Card.Header>
            <Card.Body>
              <Line data={dataEstatura} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Grafica de IMC</Card.Header>
            <Card.Body>
              <Line data={dataIMC} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Grafica de porcentaje de grasa corporal</Card.Header>
            <Card.Body>
              <Line data={porcentajegrasa} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Grafica de porcentaje de musculo</Card.Header>
            <Card.Body>
              <Line data={porcentajeMusculo} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
