import moment from "moment";
import { Card, Button } from "react-bootstrap";
import "moment/locale/es";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

moment.locale("es");

export default function Itinerario({ eventos }) {
  const [semanaActual, setSemanaActual] = useState(moment().startOf("week"));
  const eventosSemana = eventos.filter((ev) => moment(ev.start).isSameOrAfter(semanaActual) && moment(ev.start).isBefore(semanaActual.clone().add(1, "week")));

  const handleSemanaAnterior = () => {
    setSemanaActual(semanaActual.clone().subtract(1, "week"));
  };

  const handleSemanaSiguiente = () => {
    setSemanaActual(semanaActual.clone().add(1, "week"));
  };

  return (
    <Card className="p-3">
      <div className="d-flex justify-content-between mb-3">
        <Button variant="primary" onClick={handleSemanaAnterior}>
          <FaArrowLeft />
        </Button>
        <h3 className="text-center">Itinerario</h3>
        <Button variant="primary" onClick={handleSemanaSiguiente}>
          <FaArrowRight />
        </Button>
      </div>
      <ul className="list-group">
        {eventosSemana.length > 0 ? (
          eventosSemana.map((evento, index) => (
            <li key={evento.id || index} className="list-group-item">
              <strong>{evento.title}</strong> - {moment(evento.start).format("dddd, D MMMM, HH:mm")} - {moment(evento.end).format("HH:mm")}
            </li>
          ))
        ) : (
          <li className="list-group-item text-muted">No hay eventos esta semana</li>
        )}
      </ul>
    </Card>
  );
}
