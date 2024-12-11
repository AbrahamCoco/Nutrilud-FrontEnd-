"use client";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "next/navigation";
import { Utils } from "@/app/utils/utils";
import { BsWhatsapp, BsFileEarmarkMedicalFill } from "react-icons/bs";
import Link from "next/link";
import { ConsultaController } from "./consultaController";

export default function Consulta() {
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [consulta, setConsulta] = useState([]);
  const [datosFormulario, setDatosFormulario] = useState({
    nutriologo_id: "",
    peso: "",
    estatura: "",
    imc: "",
    porcentaje_grasa: "",
    porcentaje_musculo: "",
    pliegue_tricipital: "",
    pliegue_bicipital: "",
    circunferencia_cintura: "",
    circunferencia_cadera: "",
    circunferencia_brazo: "",
    fecha_medicion: "",
    siguiente_consulta: "",
  });

  const loadDatosConsulta = async () => {
    try {
      const response = await ConsultaController.getAllConsultas(id);
      const consultas = response.consulta;

      if (!consultas || consultas.length === 0) {
        setConsulta(null);
        Utils.swalWarning("No hay datos de consulta previos");
      } else {
        setConsulta(consultas);
        Utils.swalSuccess("Datos de consulta cargados correctamente");
      }
    } catch (error) {
      const message = error.response?.data?.message || "No se encontraron datos de consulta.";
      Utils.swalWarning(message);
      setConsulta(null);
    }
  };

  const loadPaciente = async () => {
    try {
      const response = await ConsultaController.getPacienteId(id);
      setPaciente(response.paciente);
    } catch {
      setPaciente(null);
    }
  };

  useEffect(() => {
    loadPaciente();
    loadDatosConsulta();
  }, []);

  const calcularEdad = (fechaNacimiento) => {
    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    if (hoy.getMonth() < fechaNac.getMonth() || (hoy.getMonth() === fechaNac.getMonth() && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad;
  };

  const handleGuardarDatos = async () => {
    const peso = parseFloat(datosFormulario.peso);
    const estatura = parseFloat(datosFormulario.estatura);
    const sexo = paciente.sexo;
    const edad = calcularEdad(paciente.fecha_nacimiento);
    const circunBrazo = parseFloat(datosFormulario.circunferencia_brazo);
    const pliegueTricipital = parseFloat(datosFormulario.pliegue_tricipital);

    let imc = 0;
    let porcentajeGrasa = 0;
    let porcentajeMusculo = 0;

    if (!isNaN(peso) && !isNaN(estatura) && estatura !== 0) {
      imc = peso / (estatura * estatura);
      porcentajeGrasa = ConsultaController.porcentajeGrasa(sexo, imc, edad);
      const areaMuscularBrazo = ConsultaController.areaMuscularBrazo(circunBrazo, pliegueTricipital, sexo);
      porcentajeMusculo = !isNaN(areaMuscularBrazo) ? estatura * (0.0264 + 0.0029 * areaMuscularBrazo) : 0;
    }

    setDatosFormulario((prev) => ({
      ...prev,
      nutriologo_id: sessionStorage.getItem("id_user"),
      imc: imc.toFixed(3),
      porcentaje_grasa: porcentajeGrasa.toFixed(3),
      porcentaje_musculo: porcentajeMusculo.toFixed(3),
    }));

    try {
      await ConsultaController.addConsulta(id, {
        ...datosFormulario,
        nutriologo_id: sessionStorage.getItem("id_user"),
        imc: imc.toFixed(3),
        porcentaje_grasa: porcentajeGrasa.toFixed(3),
        porcentaje_musculo: porcentajeMusculo.toFixed(3),
      });
      setDatosFormulario({
        peso: "",
        estatura: "",
        imc: "",
        porcentaje_grasa: "",
        porcentaje_musculo: "",
        pliegue_tricipital: "",
        pliegue_bicipital: "",
        circunferencia_cintura: "",
        circunferencia_cadera: "",
        circunferencia_brazo: "",
        fecha_medicion: "",
        siguiente_consulta: "",
      });
      loadDatosConsulta();
    } catch (error) {
      Utils.swalFailure("Error al guardar los datos de consulta", error.message);
    }
  };

  if (!paciente) {
    return (
      <div className="container">
        <h1>Cargando paciente...</h1>
      </div>
    );
  }

  return (
    <Container>
      <h1>Consulta</h1>
      <h2>Datos del paciente</h2>
      <div className="row">
        <div className="col-sm-12">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark text-center">
                <tr>
                  <th>Nombre</th>
                  <th>Alergias</th>
                  <th>Sexo</th>
                  <th>Edad</th>
                  <th>Correo</th>
                  <th>Telefono</th>
                  <th>Recordatorios</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td>
                    <strong>
                      {paciente.user.nombre} {paciente.user.primer_apellido} {paciente.user.segundo_apellido}
                    </strong>
                  </td>
                  <td>{paciente.alergias}</td>
                  <td>{paciente.sexo}</td>
                  <td>{calcularEdad(paciente.fecha_nacimiento)} años</td>
                  <td>{paciente.user.correo}</td>
                  <td>
                    {paciente.telefono}{" "}
                    <Link href={`https://wa.me/${paciente.telefono}`} target="_blank" rel="noopener noreferrer">
                      <BsWhatsapp />
                    </Link>
                  </td>
                  <td>
                    <Link
                      href={{
                        pathname: `/nutriologo/pacientes/consulta/${id}/recordatorios`,
                        query: {
                          id_paciente: paciente.id,
                          nombre: paciente.user.nombre,
                          primer_apellido: paciente.user.primer_apellido,
                          segundo_apellido: paciente.user.segundo_apellido,
                          fecha_nacimiento: paciente.fecha_nacimiento,
                        },
                      }}>
                      <Button variant="info" className="mx-1">
                        <BsFileEarmarkMedicalFill />
                      </Button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <h2>Datos de consultas previos</h2>
      <div className="row">
        <div className="col-sm-12">
          {consulta ? (
            <div className="table-responsive">
              <table className="table table-striped table-bordered align-middle">
                <thead className="text-center table-dark">
                  <tr className="align-middle">
                    <th rowSpan={2}>Fecha de medicion</th>
                    <th rowSpan={2}>Peso</th>
                    <th rowSpan={2}>Estatura</th>
                    <th rowSpan={2}>IMC</th>
                    <th rowSpan={2}>Porcentaje Grasa Corporal</th>
                    <th rowSpan={2}>Masa Muscular Total</th>
                    <th colSpan={3}>Circunferencia</th>
                    <th colSpan={2}>Pliegue</th>
                  </tr>
                  <tr>
                    <th>Cintura</th>
                    <th>Cadera</th>
                    <th>Brazo</th>
                    <th>Bicipital</th>
                    <th>Tricipital</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Array.isArray(consulta) &&
                    consulta.slice(-3).map((datos) => (
                      <tr key={datos.id}>
                        <td>
                          {new Date(new Date(datos.fecha_medicion.split(" ")[0]).getTime() + 86400000).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </td>
                        <td>{datos.peso.toFixed(3)} kg</td>
                        <td>{datos.estatura.toFixed(2)} m</td>
                        <td>{datos.imc.toFixed(3)} kg/m²</td>
                        <td>{datos.porcentaje_grasa.toFixed(2)} %</td>
                        <td>{datos.porcentaje_musculo.toFixed(3)} kg</td>
                        <td>{datos.circunferencia_cintura.toFixed(2)} cm</td>
                        <td>{datos.circunferencia_cadera.toFixed(2)} cm</td>
                        <td>{datos.circunferencia_brazo.toFixed(2)} cm²</td>
                        <td>{datos.pliegue_bicipital.toFixed(2)} mm</td>
                        <td>{datos.pliegue_tricipital.toFixed(2)} mm</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2>No hay datos de consulta previos</h2>
          )}
        </div>
      </div>
      <h2>Agregar datos de consulta actual</h2>
      <div className="row">
        <div className="col-sm-3">
          <label htmlFor="peso" className="form-label">
            Peso <span>(Kg)</span>
          </label>
          <input type="number" step="0.001" className="form-control" name="peso" value={datosFormulario.peso} onChange={(e) => setDatosFormulario({ ...datosFormulario, peso: e.target.value })} />
          <label htmlFor="estatura" className="form-label">
            Estatura <span>(m)</span>
          </label>
          <input
            type="number"
            step="0.001"
            className="form-control"
            name="estatura"
            value={datosFormulario.estatura}
            onChange={(e) =>
              setDatosFormulario({
                ...datosFormulario,
                estatura: e.target.value,
              })
            }
          />
        </div>
        <div className="col-sm-3">
          <label htmlFor="circunferencia_cintura" className="form-label">
            Circunferencia de cintura <span>(cm)</span>
          </label>
          <input
            type="number"
            step="0.001"
            className="form-control"
            name="circunferencia_cintura"
            value={datosFormulario.circunferencia_cintura}
            onChange={(e) =>
              setDatosFormulario({
                ...datosFormulario,
                circunferencia_cintura: e.target.value,
              })
            }
          />
          <label htmlFor="circunferencia_cadera" className="form-label">
            Circunferencia de cadera <span>(cm)</span>
          </label>
          <input
            type="number"
            step="0.001"
            className="form-control"
            name="circunferencia_cadera"
            value={datosFormulario.circunferencia_cadera}
            onChange={(e) =>
              setDatosFormulario({
                ...datosFormulario,
                circunferencia_cadera: e.target.value,
              })
            }
          />
          <label htmlFor="circunferencia_brazo" className="form-label">
            Circunferencia de brazo <span>(cm²)</span>
          </label>
          <input
            type="number"
            step="0.001"
            className="form-control"
            name="circunferencia_brazo"
            value={datosFormulario.circunferencia_brazo}
            onChange={(e) =>
              setDatosFormulario({
                ...datosFormulario,
                circunferencia_brazo: e.target.value,
              })
            }
          />
        </div>
        <div className="col-sm-3">
          <label htmlFor="pliegue_bicipital" className="form-label">
            Pliegue bicipital <span>(mm)</span>
          </label>
          <input
            type="number"
            step="0.001"
            className="form-control"
            name="pliegue_bicipital"
            value={datosFormulario.pliegue_bicipital}
            onChange={(e) =>
              setDatosFormulario({
                ...datosFormulario,
                pliegue_bicipital: e.target.value,
              })
            }
          />
          <label htmlFor="pliegue_tricipital" className="form-label">
            Pliegue tricipital <span>(mm)</span>
          </label>
          <input
            type="number"
            step="0.001"
            className="form-control"
            name="pliegue_tricipital"
            value={datosFormulario.pliegue_tricipital}
            onChange={(e) =>
              setDatosFormulario({
                ...datosFormulario,
                pliegue_tricipital: e.target.value,
              })
            }
          />
        </div>
        <div className="col-sm-3">
          <label htmlFor="fecha_medicion" className="form-label">
            Fecha de medicion
          </label>
          <input
            type="date"
            className="form-control"
            name="fecha_medicion"
            value={datosFormulario.fecha_medicion}
            onChange={(e) =>
              setDatosFormulario({
                ...datosFormulario,
                fecha_medicion: e.target.value,
              })
            }
          />
          <label htmlFor="fecha_siguiente_consulta" className="form-label">
            Fecha de siguiente consulta
          </label>
          <input
            type="datetime-local"
            className="form-control"
            name="siguiente_consulta"
            value={datosFormulario.siguiente_consulta}
            onChange={(e) =>
              setDatosFormulario({
                ...datosFormulario,
                siguiente_consulta: e.target.value,
              })
            }
          />
          <div className="text-center my-4">
            <button className="btn btn-primary mx-1" type="button" onClick={handleGuardarDatos}>
              Guardar datos
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
