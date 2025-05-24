"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { EstadisticasController } from "./estadisticasController";

export default function EstadisticasPaciente() {
  const params = useParams();
  const id = params?.id;
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("peso");
  const [timeRange, setTimeRange] = useState("3m");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EstadisticasController.getDatosPaciente(id);
        const sortedData = response.data.data.sort(
          (a, b) => new Date(a.fecha_medicion) - new Date(b.fecha_medicion)
        );
        setData({
          ...response.data,
          data: sortedData,
        });
      } catch (error) {
        setData(null);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-6 h-80">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-48 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const paciente = data.data[0]?.tusuario_paciente;
  const nombreCompleto = `${paciente?.nombre ?? ""} ${
    paciente?.primer_apellido ?? ""
  } ${paciente?.segundo_apellido ?? ""}`;

  const filterDataByTimeRange = (consultas) => {
    if (timeRange === "all") return consultas;
    const now = new Date();
    let cutoffDate = new Date();

    switch (timeRange) {
      case "1m":
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case "3m":
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case "6m":
        cutoffDate.setMonth(now.getMonth() - 6);
        break;
      case "1y":
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        cutoffDate.setMonth(now.getMonth() - 3);
    }

    return consultas.filter((c) => new Date(c.fecha_medicion) >= cutoffDate);
  };

  const consultasFiltradas = filterDataByTimeRange(data.data ?? []);

  const generateChartData = (key, label, unit = "", precision = 1) => {
    if (!consultasFiltradas.length) {
      return {
        labels: ["Sin datos"],
        values: [],
        currentValue: "N/A",
        change: null,
        unit,
        label,
        precision,
      };
    }

    const labels = consultasFiltradas.map((c) =>
      new Date(c.fecha_medicion).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
      })
    );

    const values = consultasFiltradas.map((c) => parseFloat(c[key]) || null);
    const filteredValues = values.filter((v) => v !== null);
    const currentValue = filteredValues[filteredValues.length - 1];

    let change = null;
    if (filteredValues.length >= 2) {
      const previousValue = filteredValues[0];
      change = ((currentValue - previousValue) / previousValue) * 100;
    }

    return {
      labels,
      values,
      currentValue,
      change,
      unit,
      label,
      precision,
    };
  };

  const metricas = {
    peso: generateChartData("peso", "Peso", "kg", 1),
    estatura: generateChartData("estatura", "Estatura", "m", 2),
    imc: generateChartData("imc", "IMC", "", 2),
    grasa: generateChartData("porcentaje_grasa", "% Grasa", "%", 1),
    musculo: generateChartData("porcentaje_musculo", "% Músculo", "%", 1),
    brazo: generateChartData("circunferencia_brazo", "Brazo", "cm", 1),
    cintura: generateChartData("circunferencia_cintura", "Cintura", "cm", 1),
    cadera: generateChartData("circunferencia_cadera", "Cadera", "cm", 1),
    colesterol: generateChartData("colesterol", "Colesterol", "mg/dL", 0),
    glucosa: generateChartData("glucosa", "Glucosa", "mg/dL", 0),
    trigliceridos: generateChartData(
      "trigliceridos",
      "Triglicéridos",
      "mg/dL",
      0
    ),
    presion: {
      ...generateChartData("presion_arterial", "Presión", "mmHg", 0),
      values: consultasFiltradas.map((c) => {
        const [sistolica] = c.presion_arterial?.split("/") || [];
        return parseInt(sistolica) || null;
      }),
      currentValue: consultasFiltradas.at(-1)?.presion_arterial ?? "N/A",
    },
  };

  const MetricCard = ({ title, value, change, unit, onClick, isActive }) => (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer transition-all ${
        isActive
          ? "bg-white shadow-lg border-2 border-green-500"
          : "bg-gray-50 hover:bg-gray-100"
      }`}
    >
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="flex items-end mt-2">
        <span className="text-2xl font-bold">{value ?? "N/A"}</span>
        {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
      </div>
      {change !== null && (
        <div
          className={`mt-2 text-sm flex items-center ${
            change >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          <span>
            {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );

  const LineChart = ({ labels, values, color = "#10B981" }) => {
    const cleanedPoints = values
      .map((value, i) => {
        if (value === null || typeof value !== "number") return null;
        const x = labels.length > 1 ? (i / (labels.length - 1)) * 100 : 50;
        return { value, label: labels[i], x };
      })
      .filter(Boolean);

    if (!cleanedPoints.length) {
      return (
        <div className="h-48 w-full flex items-center justify-center text-gray-400">
          No hay datos disponibles
        </div>
      );
    }

    const numericValues = cleanedPoints.map((p) => p.value);
    const maxValue = Math.max(...numericValues);
    const minValue = Math.min(...numericValues);
    const range = maxValue - minValue || 1;

    return (
      <div className="h-48 w-full relative">
        {/* Líneas de fondo */}
        <div className="absolute inset-0 grid grid-rows-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-gray-100"></div>
          ))}
        </div>

        {/* SVG con polyline */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          role="img"
          aria-label="Gráfico de línea de métricas del paciente"
        >
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2"
            points={cleanedPoints
              .map(({ x, value }) => {
                const y = 100 - ((value - minValue) / range) * 100;
                return `${x},${y}`;
              })
              .join(" ")}
          />
        </svg>

        {/* Puntos y etiquetas */}
        <div className="relative h-full w-full">
          {cleanedPoints.map((point, i) => {
            const height = ((point.value - minValue) / range) * 100;

            return (
              <div
                className="absolute"
                style={{ left: `${point.x}%`, top: `${100 - height}%` }}
              >
                <div
                  className="absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 0 4px ${color}20`,
                  }}
                ></div>

                {i % Math.ceil(labels.length / 6) === 0 && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs text-gray-500">
                    {point.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const currentMetric = metricas[activeTab];

  return (
    <div className="bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Estadísticas del Paciente</h1>
        <p className="text-lg text-gray-700">{nombreCompleto}</p>
        <p className="text-sm text-gray-500">
          Nutriólogo: {data.data[0]?.tusuario_nutriologo?.nombre ?? ""}{" "}
          {data.data[0]?.tusuario_nutriologo?.primer_apellido ?? ""}
        </p>
      </div>

      {/* Filtro de rango de tiempo */}
      <div className="flex space-x-2 mb-6">
        {["1m", "3m", "6m", "1y", "all"].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 py-1 rounded-full text-sm ${
              timeRange === range
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 border hover:bg-gray-100"
            }`}
          >
            {range === "1m"
              ? "1 mes"
              : range === "3m"
              ? "3 meses"
              : range === "6m"
              ? "6 meses"
              : range === "1y"
              ? "1 año"
              : "Todo"}
          </button>
        ))}
      </div>

      {/* Tarjetas de métricas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {["peso", "imc", "grasa", "musculo", "presion"].map((key) => {
          const metric = metricas[key];
          const isNumber =
            typeof metric.currentValue === "number" &&
            !isNaN(metric.currentValue);
          const displayValue =
            key === "presion"
              ? metric.currentValue
              : isNumber
              ? metric.currentValue.toFixed(metric.precision)
              : "N/A";

          return (
            <MetricCard
              key={key}
              title={metric.label}
              value={displayValue}
              change={metric.change}
              unit={metric.unit}
              onClick={() => setActiveTab(key)}
              isActive={activeTab === key}
            />
          );
        })}
      </div>

      {/* Gráfico principal */}
      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold mb-4">{currentMetric.label}</h2>
        <LineChart
          labels={currentMetric.labels}
          values={currentMetric.values}
        />
      </div>
    </div>
  );
}
