"use client";
import { useState } from "react";
import { Button, Card, Table, Toast, ToastContainer } from "react-bootstrap";
import moment from "moment";
import "moment/locale/es";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

moment.locale("es");

export default function CalendarMonths({ eventos }) {
  const [mesActual, setMesActual] = useState(moment().startOf("month"));
  const [showToasts, setShowToasts] = useState([]);
  const diasMes = Array.from({ length: mesActual.daysInMonth() }, (_, i) => mesActual.clone().date(i + 1));

  const handleMesAnterior = () => {
    setMesActual(mesActual.clone().subtract(1, "month"));
  };

  const handleMesSiguiente = () => {
    setMesActual(mesActual.clone().add(1, "month"));
  };

  const handleShowToast = (fecha, eventosDia) => {
    const eventosDelDia = eventosDia.filter((ev) => moment(ev.start).isSame(fecha, "day"));
    setShowToasts(eventosDelDia.map((ev) => ({ id: Date.now(), title: ev.title })));
  };

  return (
    <>
      <Card className="p-3">
        <div className="d-flex justify-content-between mb-3">
          <Button variant="primary" onClick={handleMesAnterior}>
            <FaArrowLeft />
          </Button>
          <h3 className="text-center">{mesActual.format("MMMM YYYY")}</h3>
          <Button variant="primary" onClick={handleMesSiguiente}>
            <FaArrowRight />
          </Button>
        </div>
        <Table bordered className="text-center">
          <thead>
            <tr>
              {moment.weekdaysShort(true).map((dia) => (
                <th key={dia}>{dia}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(6)].map((_, semana) => (
              <tr key={semana}>
                {[...Array(7)].map((_, dia) => {
                  const fecha = diasMes.find((d) => d.week() === mesActual.week() + semana && d.isoWeekday() === dia + 1);
                  const eventosDia = eventos.filter((ev) => moment(ev.start).isSame(fecha, "day"));
                  return (
                    <td key={dia} className="p-2">
                      {fecha && (
                        <>
                          <span className="fw-bold">{fecha.date()}</span>
                          {eventosDia.length > 0 && (
                            <div className="text-danger small" onClick={() => handleShowToast(fecha, eventosDia)}>
                              {eventosDia.length === 1 ? "Consulta" : "Consultas"}: {eventosDia.length}
                            </div>
                          )}
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <ToastContainer position="bottom-end" style={{ zIndex: 1 }}>
        {showToasts.map((toast) => (
          <Toast key={toast.id} onClose={() => setShowToasts(showToasts.filter((t) => t.id !== toast.id))} show={true} delay={5000} autohide>
            <Toast.Body>{toast.title}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </>
  );
}
