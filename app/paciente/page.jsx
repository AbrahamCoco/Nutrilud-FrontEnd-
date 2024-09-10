"use client";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Utils } from "../utils/utils";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Paciente() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`auth/user/${sessionStorage.getItem("id_user")}`);
      setData(response.data);
      Utils.swalSuccess("Datos cargados correctamente");
    } catch (error) {
      Utils.swalError("Error al cargar datos del paciente", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    const labels = data.data.paciente.consulta.map((c) => {
      const date = new Date(c.fecha_medicion);
      return date.toLocaleDateString("es-ES", { month: "long" });
    });

    const firstDate = new Date(data.data.paciente.consulta[0].fecha_medicion);
    firstDate.setMonth(firstDate.getMonth() - 1);
    const previousMonth = firstDate.toLocaleDateString("es-ES", { month: "long" });
    const lastDate = new Date(data.data.paciente.consulta[data.data.paciente.consulta.length - 1].fecha_medicion);
    lastDate.setMonth(lastDate.getMonth() + 1);
    const nextMonth = lastDate.toLocaleDateString("es-ES", { month: "long" });
    const updatedLabels = [previousMonth, ...labels, nextMonth];
    const datasetData = data.data.paciente.consulta.map((c) => c[key]);
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
        <h1>Dashboard</h1>
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
            <Card.Header>Grafica de estatura</Card.Header>
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
        <Col md={4} className="py-4">
          <Card>
            <Card.Header>Grafica de porcentaje de grasa</Card.Header>
            <Card.Body>
              <Line data={porcentajegrasa} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="py-4">
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
