import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { partidosService } from '../services/partidosService';
import './PartidoDetail.css';

function PartidoDetail() {
  const { id } = useParams();
  const [partido, setPartido] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartido = async () => {
      try {
        const response = await partidosService.getPartido(id);
        setPartido(response.data);
      } catch (error) {
        console.error('Error fetching partido:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartido();
  }, [id]);

  if (loading) return <div className="loading">Cargando...</div>;
  if (!partido) return <div>No encontrado</div>;

  return (
    <div className="partido-detail">
      <h1>{partido.equipoLocal?.nombre} vs {partido.equipoVisitante?.nombre}</h1>
      <div className="resultado-detail">{partido.golesLocal} - {partido.golesVisitante}</div>
      
      <section className="formaciones">
        <h2>Formaciones</h2>
        {partido.formaciones?.map(formacion => (
          <div key={formacion.id} className="formacion">
            <h3>{formacion.equipo?.nombre}</h3>
            <p>Titulares: {formacion.titulares.join(', ')}</p>
            <p>Suplentes: {formacion.suplentes.join(', ')}</p>
          </div>
        ))}
      </section>

      <section className="goles">
        <h2>Goles</h2>
        {partido.goles?.map(gol => (
          <div key={gol.id}>{gol.jugador?.nombre} {gol.minuto}'</div>
        ))}
      </section>

      <section className="tarjetas">
        <h2>Tarjetas</h2>
        {partido.tarjetas?.map(tarjeta => (
          <div key={tarjeta.id}>{tarjeta.jugador?.nombre} {tarjeta.minuto}' ({tarjeta.tipo})</div>
        ))}
      </section>

      {partido.estadisticas && (
        <section className="estadisticas">
          <h2>Estadísticas</h2>
          <p>Posesión: {partido.estadisticas[0]?.posesionLocal}% - {partido.estadisticas[0]?.posesionVisitante}%</p>
        </section>
      )}
    </div>
  );
}

export default PartidoDetail;
